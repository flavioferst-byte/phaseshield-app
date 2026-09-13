import os
import uuid
import shutil
import time
import threading
import platform
import wave
import subprocess
import json
import urllib.request
import numpy as np
from fastapi import FastAPI, UploadFile, File, BackgroundTasks, HTTPException, Form
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Phase Cancellation SaaS")

# Configurar CORS para permitir acessos locais de desenvolvimento
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dicionário em memória para rastrear tarefas de processamento
TASKS = {} # task_id -> { "status", "progress", "message", "file_name", "result_file" }

# Descobrir o executável do FFmpeg correto
def get_ffmpeg_cmd():
    local_ffmpeg = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ffmpeg.exe")
    if platform.system() == "Windows" and os.path.exists(local_ffmpeg):
        return local_ffmpeg
    return "ffmpeg"

def cleanup_old_files():
    """Remove arquivos com mais de 30 minutos para evitar estouro de disco"""
    while True:
        try:
            now = time.time()
            for folder in ["temp/inputs", "temp/outputs"]:
                if os.path.exists(folder):
                    for f in os.listdir(folder):
                        fp = os.path.join(folder, f)
                        if os.stat(fp).st_mtime < now - 1800: # 30 minutos
                            if os.path.isfile(fp):
                                os.remove(fp)
                                print(f"🧹 Cleanup: Removido arquivo antigo {fp}")
        except Exception as e:
            print(f"✗ Erro no cleanup: {e}")
        time.sleep(300) # Roda a cada 5 minutos

@app.on_event("startup")
def startup_event():
    os.makedirs("temp/inputs", exist_ok=True)
    os.makedirs("temp/outputs", exist_ok=True)
    os.makedirs("static", exist_ok=True)
    
    # Inicia a thread de cleanup como daemon
    cleanup_thread = threading.Thread(target=cleanup_old_files, daemon=True)
    cleanup_thread.start()
    print("🚀 Servidor iniciado. Monitor de cleanup de arquivos temporários ativo.")

# Função que executa o processamento em background
def run_phase_cancellation(task_id: str, input_path: str, output_path: str):
    TEMP_IN = f"temp_{task_id}_in.wav"
    TEMP_OUT = f"temp_{task_id}_out.wav"
    ffmpeg_cmd = get_ffmpeg_cmd()
    
    try:
        # Passo 1: Extrair áudio
        TASKS[task_id].update({"status": "processing", "progress": 20, "message": "Extraindo áudio original..."})
        
        proc = subprocess.run([
            ffmpeg_cmd, "-y", "-i", input_path,
            "-vn", "-acodec", "pcm_s16le", "-ar", "44100", "-ac", "2",
            TEMP_IN
        ], capture_output=True, text=True)
        
        if proc.returncode != 0:
            raise Exception(f"Erro no FFmpeg ao extrair áudio: {proc.stderr[:200]}")
            
        if not os.path.exists(TEMP_IN):
            raise Exception("Arquivo de áudio temporário não foi gerado.")
            
        # Passo 2: Phase Cancellation
        TASKS[task_id].update({"status": "processing", "progress": 50, "message": "Aplicando phase cancellation no áudio..."})
        
        with wave.open(TEMP_IN, 'rb') as wf:
            n_ch = wf.getnchannels()
            sw = wf.getsampwidth()
            fr = wf.getframerate()
            n_frames = wf.getnframes()
            file_size_mb = os.path.getsize(TEMP_IN) / (1024 * 1024)
            
            with wave.open(TEMP_OUT, 'wb') as wf_out:
                wf_out.setnchannels(2)
                wf_out.setsampwidth(2)
                wf_out.setframerate(fr)
                
                # Se for arquivo grande, processa em chunks para economizar RAM
                if file_size_mb > 100:
                    CHUNK_SIZE = 1024 * 1024 # Chunk de 1MB
                    while True:
                        data = wf.readframes(CHUNK_SIZE // sw)
                        if not data:
                            break
                        samples = np.frombuffer(data, dtype=np.int16).copy()
                        if n_ch == 1:
                            samples = np.column_stack([samples, samples])
                        else:
                            samples = samples.reshape(-1, 2)
                        
                        mono = samples[:, 0].astype(np.float64)
                        out_L = np.clip(mono, -32768, 32767).astype(np.int16)
                        out_R = np.clip(-mono, -32768, 32767).astype(np.int16)
                        
                        out_interleaved = np.empty(len(out_L) * 2, dtype=np.int16)
                        out_interleaved[0::2] = out_L
                        out_interleaved[1::2] = out_R
                        wf_out.writeframes(out_interleaved.tobytes())
                else:
                    raw = wf.readframes(n_frames)
                    samples = np.frombuffer(raw, dtype=np.int16).copy()
                    if n_ch == 1:
                        samples = np.column_stack([samples, samples])
                    else:
                        samples = samples.reshape(-1, 2)
                        
                    mono = samples[:, 0].astype(np.float64)
                    out = np.empty(len(mono) * 2, dtype=np.int16)
                    out[0::2] = np.clip(mono, -32768, 32767).astype(np.int16)
                    out[1::2] = np.clip(-mono, -32768, 32767).astype(np.int16)
                    wf_out.writeframes(out.tobytes())

        # Passo 3: Remux (unir o vídeo original com o novo áudio invertido)
        TASKS[task_id].update({"status": "processing", "progress": 80, "message": "Remuxando vídeo com áudio modificado..."})
        
        proc2 = subprocess.run([
            ffmpeg_cmd, "-y", "-i", input_path, "-i", TEMP_OUT,
            "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
            "-map", "0:v:0", "-map", "1:a:0",
            output_path
        ], capture_output=True, text=True)
        
        if proc2.returncode != 0:
            raise Exception(f"Erro no FFmpeg ao remuxar vídeo: {proc2.stderr[:200]}")
            
        if not os.path.exists(output_path):
            raise Exception("Vídeo final não foi gerado.")
            
        # Concluído com sucesso
        TASKS[task_id].update({
            "status": "completed",
            "progress": 100,
            "message": "Processamento concluído com sucesso!",
            "result_file": output_path
        })
        
    except Exception as e:
        print(f"✗ Erro no processamento da task {task_id}: {e}")
        TASKS[task_id].update({
            "status": "failed",
            "progress": 100,
            "message": f"Erro: {str(e)}"
        })
    finally:
        # Limpar arquivos de áudio temporários
        if os.path.exists(TEMP_IN):
            try: os.remove(TEMP_IN)
            except: pass
        if os.path.exists(TEMP_OUT):
            try: os.remove(TEMP_OUT)
            except: pass
        # Limpar vídeo original enviado para liberar espaço
        if os.path.exists(input_path):
            try: os.remove(input_path)
            except: pass

@app.post("/api/upload")
async def upload_file(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """Recebe o arquivo e inicia o processamento em background"""
    if not file.filename.lower().endswith(('.mp4', '.mkv', '.avi', '.mov')):
        raise HTTPException(status_code=400, detail="Formato de arquivo inválido. Apenas vídeos são suportados.")
        
    task_id = str(uuid.uuid4())
    ext = os.path.splitext(file.filename)[1]
    input_path = f"temp/inputs/{task_id}{ext}"
    output_path = f"temp/outputs/{task_id}{ext}"
    
    # Salvar arquivo de upload no disco
    try:
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao salvar arquivo enviado: {str(e)}")
        
    # Registrar tarefa
    TASKS[task_id] = {
        "status": "pending",
        "progress": 0,
        "message": "Upload concluído. Iniciando fila...",
        "file_name": file.filename,
        "result_file": ""
    }
    
    # Disparar background task
    background_tasks.add_task(run_phase_cancellation, task_id, input_path, output_path)
    
    return {"task_id": task_id}

@app.get("/api/status/{task_id}")
async def get_status(task_id: str):
    """Retorna o status atual do processamento de um vídeo"""
    if task_id not in TASKS:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada.")
    return TASKS[task_id]

@app.get("/api/download/{task_id}")
async def download_file(task_id: str):
    """Envia o arquivo processado final de volta para download"""
    if task_id not in TASKS or TASKS[task_id]["status"] != "completed":
        raise HTTPException(status_code=404, detail="Arquivo não disponível ou tarefa pendente.")
        
    file_path = TASKS[task_id]["result_file"]
    original_name = TASKS[task_id]["file_name"]
    
    base, ext = os.path.splitext(original_name)
    download_name = f"{base}__hacked{ext}"
    
    if os.path.exists(file_path):
        return FileResponse(
            path=file_path,
            filename=download_name,
            media_type="application/octet-stream"
        )
    else:
        raise HTTPException(status_code=404, detail="Arquivo físico expirou ou foi excluído do servidor.")

# ── ElevenLabs voiceover integration helpers ──
def get_ffprobe_cmd():
    local_ffprobe = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ffprobe.exe")
    if platform.system() == "Windows" and os.path.exists(local_ffprobe):
        return local_ffprobe
    return "ffprobe"

def get_video_duration(file_path: str) -> float:
    ffprobe_cmd = get_ffprobe_cmd()
    try:
        proc = subprocess.run([
            ffprobe_cmd, "-v", "error", "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1", file_path
        ], capture_output=True, text=True)
        if proc.returncode == 0:
            return float(proc.stdout.strip())
    except Exception as e:
        print(f"Erro ao obter duração com ffprobe: {e}")
    
    try:
        ffmpeg_cmd = get_ffmpeg_cmd()
        proc = subprocess.run([ffmpeg_cmd, "-i", file_path], capture_output=True, text=True)
        for line in proc.stderr.splitlines():
            if "Duration:" in line:
                time_str = line.split("Duration:")[1].split(",")[0].strip()
                h, m, s = time_str.split(":")
                return float(h) * 3600 + float(m) * 60 + float(s)
    except Exception as e:
        print(f"Erro no fallback de duração com ffmpeg: {e}")
    return 0.0

def has_audio_stream(file_path: str) -> bool:
    ffprobe_cmd = get_ffprobe_cmd()
    try:
        proc = subprocess.run([
            ffprobe_cmd, "-v", "error", "-select_streams", "a", "-show_entries", "stream=codec_type",
            "-of", "default=noprint_wrappers=1:nokey=1", file_path
        ], capture_output=True, text=True)
        if proc.returncode == 0 and proc.stdout.strip():
            return True
    except Exception as e:
        print(f"Erro ao verificar streams de áudio com ffprobe: {e}")
    
    try:
        ffmpeg_cmd = get_ffmpeg_cmd()
        proc = subprocess.run([ffmpeg_cmd, "-i", file_path], capture_output=True, text=True)
        if "Audio:" in proc.stderr:
            return True
    except Exception as e:
        print(f"Erro no fallback de verificação de áudio: {e}")
    return False

def generate_voiceover(text: str, voice_id: str, api_key: str, output_path: str):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json",
        "accept": "audio/mpeg"
    }
    data = {
        "text": text,
        "model_id": "eleven_multilingual_v1",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75
        }
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode("utf-8"),
        headers=headers,
        method="POST"
    )
    with urllib.request.urlopen(req) as response:
        with open(output_path, "wb") as f:
            f.write(response.read())

def run_voiceover_generation(task_id: str, input_path: str, output_path: str, text: str):
    TEMP_AUDIO = f"temp_{task_id}_narracao.mp3"
    ffmpeg_cmd = get_ffmpeg_cmd()
    
    try:
        # Passo 1: Validar duração do vídeo
        TASKS[task_id].update({"status": "processing", "progress": 10, "message": "Validando vídeo..."})
        duration = get_video_duration(input_path)
        if duration > 30.5:
            raise Exception("O vídeo excede o limite máximo de 30 segundos.")
        
        # Passo 2: Chamar ElevenLabs
        TASKS[task_id].update({"status": "processing", "progress": 30, "message": "Gerando narração com ElevenLabs..."})
        api_key = os.environ.get("ELEVENLABS_API_KEY", "sk_1e3e182918d7c0fe86f8ed06bfaded77b3dc07ee99588c4e")
        voice_id = os.environ.get("ELEVENLABS_VOICE_ID", "pNInz6obpgmA5mK6IGjG") # Adam
        
        if not api_key:
            raise Exception("API Key do ElevenLabs não configurada no servidor.")
            
        generate_voiceover(text, voice_id, api_key, TEMP_AUDIO)
        
        if not os.path.exists(TEMP_AUDIO) or os.path.getsize(TEMP_AUDIO) == 0:
            raise Exception("Falha ao gerar o arquivo de narração.")
            
        # Passo 3: Mesclar vídeo com áudio da narração (volume 1% -> 0.01)
        TASKS[task_id].update({"status": "processing", "progress": 70, "message": "Mesclando áudio (volume da narração a 1%)..."})
        
        video_has_audio = has_audio_stream(input_path)
        
        if video_has_audio:
            cmd = [
                ffmpeg_cmd, "-y", "-i", input_path, "-i", TEMP_AUDIO,
                "-filter_complex", "[1:a]volume=1.0[aout]",
                "-map", "0:v:0", "-map", "[aout]",
                "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest",
                output_path
            ]
        else:
            cmd = [
                ffmpeg_cmd, "-y", "-i", input_path, "-i", TEMP_AUDIO,
                "-filter_complex", "[1:a]volume=0.01[aout]",
                "-map", "0:v:0", "-map", "[aout]",
                "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest",
                output_path
            ]
            
        proc = subprocess.run(cmd, capture_output=True, text=True)
        if proc.returncode != 0:
            raise Exception(f"Erro no FFmpeg ao mesclar áudio: {proc.stderr[:200]}")
            
        if not os.path.exists(output_path):
            raise Exception("Vídeo final não foi gerado.")
            
        # Concluído com sucesso
        TASKS[task_id].update({
            "status": "completed",
            "progress": 100,
            "message": "Processamento concluído com sucesso!",
            "result_file": output_path
        })
        
    except Exception as e:
        print(f"✗ Erro no voiceover da task {task_id}: {e}")
        TASKS[task_id].update({
            "status": "failed",
            "progress": 100,
            "message": f"Erro: {str(e)}"
        })
    finally:
        # Limpeza total de arquivos temporários
        if os.path.exists(TEMP_AUDIO):
            try: os.remove(TEMP_AUDIO)
            except: pass
        if os.path.exists(input_path):
            try: os.remove(input_path)
            except: pass

@app.post("/api/upload-voiceover")
async def upload_voiceover_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    text: str = Form(...)
):
    """Recebe o arquivo de vídeo e o texto da narração e inicia a geração em background"""
    if not file.filename.lower().endswith(('.mp4', '.mkv', '.avi', '.mov')):
        raise HTTPException(status_code=400, detail="Formato de arquivo inválido. Apenas vídeos são suportados.")
        
    text = text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="O texto da narração não pode ser vazio.")
        
    if len(text) > 400:
        raise HTTPException(status_code=400, detail="O texto excede o limite máximo de 400 caracteres.")
        
    task_id = str(uuid.uuid4())
    ext = os.path.splitext(file.filename)[1]
    input_path = f"temp/inputs/{task_id}{ext}"
    output_path = f"temp/outputs/{task_id}{ext}"
    
    # Salvar arquivo de upload no disco
    try:
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao salvar arquivo enviado: {str(e)}")
        
    # Registrar tarefa
    TASKS[task_id] = {
        "status": "pending",
        "progress": 0,
        "message": "Upload concluído. Iniciando geração...",
        "file_name": file.filename,
        "result_file": ""
    }
    
    # Disparar background task
    background_tasks.add_task(run_voiceover_generation, task_id, input_path, output_path, text)
    
    return {"task_id": task_id}

# Montar pasta estática
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_index():
    return FileResponse("static/index.html")
