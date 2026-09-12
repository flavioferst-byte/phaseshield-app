#!/usr/bin/env python3
"""
Phase Cancellation Audio Hack - Local Version
Processa vídeos localmente sem precisar fazer upload
Uso: python3 phase_cancel_local.py input.mp4
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
        print(f"📹 Processando: {input_video}")
        
        # Extrair áudio
        print("  1/4 — Extraindo áudio...")
        subprocess.run([
            "ffmpeg","-y","-i",input_video,
            "-vn","-acodec","pcm_s16le","-ar","44100","-ac","2",
            TEMP_IN
        ], check=True, capture_output=True)
        
        # Phase cancellation
        print("  2/4 — Aplicando phase cancellation...")
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
        
        # Remux
        print("  3/4 — Remuxando vídeo...")
        subprocess.run([
            "ffmpeg","-y","-i",input_video,"-i",TEMP_OUT,
            "-c:v","copy","-c:a","aac","-b:a","192k",
            "-map","0:v:0","-map","1:a:0",
            output_video
        ], check=True, capture_output=True)
        
        os.remove(TEMP_IN); os.remove(TEMP_OUT)
        
        size_mb = os.path.getsize(output_video) / 1024 / 1024
        print(f"  4/4 — ✓ Pronto! {size_mb:.1f} MB\n")
        return output_video
        
    except Exception as e:
        print(f"  ✗ Erro: {str(e)}\n")
        return None

def phase_cancel_hack_large(input_video, output_video=None):
    """Process video with phase cancellation hack (large files >500MB)"""
    if output_video is None:
        output_video = input_video.replace(".mp4", "__hacked.mp4")
    
    TEMP_IN  = "temp_audio_in.wav"
    TEMP_OUT = "temp_audio_hacked.wav"
    
    try:
        print(f"📹 Processando (modo large): {input_video}")
        
        # Extrair áudio
        print("  1/4 — Extraindo áudio...")
        subprocess.run([
            "ffmpeg","-y","-i",input_video,
            "-vn","-acodec","pcm_s16le","-ar","44100","-ac","2",
            TEMP_IN
        ], check=True, capture_output=True)
        
        # Phase cancellation em chunks
        print("  2/4 — Aplicando phase cancellation (streaming)...")
        CHUNK_SIZE = 1024 * 1024  # 1 MB chunks
        
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
        
        # Remux
        print("  3/4 — Remuxando vídeo...")
        subprocess.run([
            "ffmpeg","-y","-i",input_video,"-i",TEMP_OUT,
            "-c:v","copy","-c:a","aac","-b:a","192k",
            "-map","0:v:0","-map","1:a:0",
            output_video
        ], check=True, capture_output=True)
        
        os.remove(TEMP_IN); os.remove(TEMP_OUT)
        
        size_mb = os.path.getsize(output_video) / 1024 / 1024
        print(f"  4/4 — ✓ Pronto! {size_mb:.1f} MB\n")
        return output_video
        
    except Exception as e:
        print(f"  ✗ Erro: {str(e)}\n")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("╔═══════════════════════════════════════════════════════╗")
        print("║   Phase Cancellation Audio Hack - Local Version       ║")
        print("╚═══════════════════════════════════════════════════════╝\n")
        print("Uso:")
        print("  python3 phase_cancel_local.py video.mp4")
        print("  python3 phase_cancel_local.py video.mp4 output.mp4\n")
        print("Requisitos:")
        print("  - ffmpeg instalado")
        print("  - Python 3.6+")
        print("  - numpy: pip install numpy\n")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None
    
    if not os.path.exists(input_file):
        print(f"✗ Arquivo não encontrado: {input_file}\n")
        sys.exit(1)
    
    file_size_mb = os.path.getsize(input_file) / 1024 / 1024
    print(f"\n📊 Tamanho: {file_size_mb:.1f} MB")
    
    if file_size_mb > 500:
        phase_cancel_hack_large(input_file, output_file)
    else:
        phase_cancel_hack(input_file, output_file)
