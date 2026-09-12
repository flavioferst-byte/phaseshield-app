FROM node:18-slim

# Instala o FFmpeg para processamento de áudio/vídeo
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia e instala dependências
COPY package*.json ./
RUN npm install --production

# Copia a aplicação
COPY . .

# Expõe a porta do servidor Express
EXPOSE 5000

# Executa o servidor Node.js
CMD ["npm", "start"]
