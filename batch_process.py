#!/usr/bin/env python3
"""
Batch Phase Cancellation - Processa vários vídeos de uma vez
Coloca este arquivo na mesma pasta dos vídeos e roda:
  python3 batch_process.py
"""

import subprocess, os, sys, wave, numpy as np
from pathlib import Path

def phase_cancel_hack(input_video, output_video=None):
    """Process video with phase cancellation hack (small files <500MB)"""
    if output_video is None:
        output_video = input_video.replace(".mp4", "__hacked.mp4")
    
    TEMP_IN  = "temp_audio_in.wav"
    TEMP_OUT = "temp_audio_hacked.wav"
    
    try:
        subprocess.run([
            "ffmpeg","-y","-i",input_video,
            "-vn","-acodec","pcm_s16le","-ar","44100","-ac","2",
            TEMP_IN
        ], check=True, capture_output=True)
        
        with wave.open(TEMP_IN,'rb') as wf:
            n_ch=wf.getnchannels(); sw=wf.getsampwidth(); fr=wf.getframerate()
            raw=wf.readframes(wf.getnframes())
        
        samples=np.frombuffer(raw,dtype=np.int16).copy()
        if n_ch==1: samples=np.column_stack([samples,samples])
        else: samples=samples.reshape(-1,2)
        
        mono=samples[:,0].astype(np.float64)
        out=np.empty(len(mono)*2,dtype=np.int16)
        out[0::2]=np.clip(mono,-32768,32767).astype(np.int16)
        out[1::2]=np.clip(-mono,-32768,32767).astype(np.int16)
        
        with wave.open(TEMP_OUT,'wb') as wf2:
            wf2.setnchannels(2); wf2.setsampwidth(2); wf2.setframerate(fr)
            wf2.writeframes(out.tobytes())
        
        subprocess.run([
            "ffmpeg","-y","-i",input_video,"-i",TEMP_OUT,
            "-c:v","copy","-c:a","aac","-b:a","192k",
            "-map","0:v:0","-map","1:a:0",
            output_video
        ], check=True, capture_output=True)
        
        os.remove(TEMP_IN); os.remove(TEMP_OUT)
        return True
        
    except Exception as e:
        return False

def phase_cancel_hack_large(input_video, output_video=None):
    """Process video with phase cancellation hack (large files >500MB)"""
    if output_video is None:
        output_video = input_video.replace(".mp4", "__hacked.mp4")
    
    TEMP_IN  = "temp_audio_in.wav"
    TEMP_OUT = "temp_audio_hacked.wav"
    
    try:
        subprocess.run([
            "ffmpeg","-y","-i",input_video,
            "-vn","-acodec","pcm_s16le","-ar","44100","-ac","2",
            TEMP_IN
        ], check=True, capture_output=True)
        
        CHUNK_SIZE = 1024 * 1024
        
        with wave.open(TEMP_IN,'rb') as wf_in:
            n_ch = wf_in.getnchannels(); sw = wf_in.getsampwidth(); fr = wf_in.getframerate()
            with wave.open(TEMP_OUT,'wb') as wf_out:
                wf_out.setnchannels(2); wf_out.setsampwidth(2); wf_out.setframerate(fr)
                while True:
                    data = wf_in.readframes(CHUNK_SIZE // sw)
                    if not data: break
                    samples = np.frombuffer(data, dtype=np.int16).copy()
                    if n_ch == 1: samples = np.column_stack([samples, samples])
                    else: samples = samples.reshape(-1, 2)
                    mono = samples[:, 0].astype(np.float64)
                    out_L = np.clip(mono, -32768, 32767).astype(np.int16)
                    out_R = np.clip(-mono, -32768, 32767).astype(np.int16)
                    out_interleaved = np.empty(len(out_L) * 2, dtype=np.int16)
                    out_interleaved[0::2] = out_L; out_interleaved[1::2] = out_R
                    wf_out.writeframes(out_interleaved.tobytes())
        
        subprocess.run([
            "ffmpeg","-y","-i",input_video,"-i",TEMP_OUT,
            "-c:v","copy","-c:a","aac","-b:a","192k",
            "-map","0:v:0","-map","1:a:0",
            output_video
        ], check=True, capture_output=True)
        
        os.remove(TEMP_IN); os.remove(TEMP_OUT)
        return True
        
    except Exception as e:
        return False

if __name__ == "__main__":
    print("\n╔═════════════════════════════════════════════════════════╗")
    print("║        Processando vários vídeos...                     ║")
    print("╚═════════════════════════════════════════════════════════╝\n")
    
    # Encontra todos os arquivos .mp4 na pasta
    videos = list(Path(".").glob("*.mp4"))
    videos = [v for v in videos if "__hacked" not in str(v)]
    
    if not videos:
        print("✗ Nenhum vídeo .mp4 encontrado na pasta!\n")
        sys.exit(1)
    
    print(f"📽️  Encontrados {len(videos)} vídeo(s):\n")
    for i, v in enumerate(videos, 1):
        size_mb = v.stat().st_size / 1024 / 1024
        print(f"  {i}. {v.name} ({size_mb:.1f} MB)")
    
    print("\n" + "="*57 + "\n")
    
    success = 0
    failed = 0
    
    for i, video in enumerate(videos, 1):
        file_size_mb = video.stat().st_size / 1024 / 1024
        print(f"[{i}/{len(videos)}] Processando: {video.name}")
        
        try:
            if file_size_mb > 500:
                result = phase_cancel_hack_large(str(video))
            else:
                result = phase_cancel_hack(str(video))
            
            if result:
                output_name = str(video).replace(".mp4", "__hacked.mp4")
                output_size = os.path.getsize(output_name) / 1024 / 1024
                print(f"  ✓ {output_name} ({output_size:.1f} MB)\n")
                success += 1
            else:
                print(f"  ✗ Erro ao processar\n")
                failed += 1
        except Exception as e:
            print(f"  ✗ Erro: {str(e)[:50]}\n")
            failed += 1
    
    print("="*57)
    print(f"\n✓ Sucesso: {success}/{len(videos)}")
    if failed > 0:
        print(f"✗ Falhas: {failed}/{len(videos)}")
    print()
