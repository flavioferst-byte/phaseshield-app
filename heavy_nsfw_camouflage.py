#!/usr/bin/env python3
import sys
import os
from PIL import Image, ImageFilter, ImageEnhance
import numpy as np
from io import BytesIO
import random

def heavy_nsfw_camouflage(input_path_or_bytes, output_path="camuflada_pesada.jpg"):
    if isinstance(input_path_or_bytes, bytes):
        img = Image.open(BytesIO(input_path_or_bytes)).convert("RGB")
    else:
        img = Image.open(input_path_or_bytes).convert("RGB")
    
    img_array = np.array(img, dtype=np.float32)
    
    # Ruído muito forte + perturbação
    noise = np.random.normal(0, 9.5, img_array.shape)
    img_array += noise
    img_array = np.clip(img_array, 0, 255)
    
    img_pil = Image.fromarray(img_array.astype(np.uint8))
    
    # Blur + grain pesado
    img_pil = img_pil.filter(ImageFilter.GaussianBlur(radius=1.5))
    img_pil = ImageEnhance.Sharpness(img_pil).enhance(1.4)
    
    # Compressão forte + ciclos
    for _ in range(2):
        buffer = BytesIO()
        img_pil.save(buffer, format="JPEG", quality=random.randint(65, 78), optimize=True)
        img_pil = Image.open(buffer)
    
    img_pil.save(output_path, format="JPEG", quality=68, optimize=True, progressive=True)
    print(f"✅ Imagem salva: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python heavy_nsfw_camouflage.py <caminho_da_imagem> [caminho_de_saida]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else "camuflada_pesada.jpg"
    
    if not os.path.exists(input_file):
        print(f"Erro: Arquivo '{input_file}' não encontrado.")
        sys.exit(1)
        
    heavy_nsfw_camouflage(input_file, output_file)
