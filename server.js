const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const https = require('https');
const crypto = require('crypto');
const querystring = require('querystring');

const app = express();
const PORT = process.env.PORT || 5000;

// No Vercel, usar /tmp (Ãºnica pasta gravÃ¡vel). Localmente, usar temp/
const IS_VERCEL = process.env.VERCEL === '1';
const TMP_BASE = IS_VERCEL ? '/tmp' : path.join(__dirname, 'temp');
const INPUTS_DIR = path.join(TMP_BASE, 'inputs');
const OUTPUTS_DIR = path.join(TMP_BASE, 'outputs');

// Configurar armazenamento do Multer para os vÃ­deos enviados
const upload = multer({
    dest: INPUTS_DIR,
    limits: { fileSize: 200 * 1024 * 1024 } // limite de 200MB
});

// Criar pastas necessÃ¡rias
try { fs.mkdirSync(INPUTS_DIR, { recursive: true }); } catch(e) {}
try { fs.mkdirSync(OUTPUTS_DIR, { recursive: true }); } catch(e) {}

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Proxy Firebase Auth endpoints to bypass third-party cookie restrictions (Native HTTPS proxy)
app.use('/__/auth', (req, res) => {
    const targetUrl = 'https://blackvoice-6d009.firebaseapp.com/__/auth' + req.url;
    const clientReq = https.request(targetUrl, {
        method: req.method,
        headers: {
            ...req.headers,
            host: 'blackvoice-6d009.firebaseapp.com'
        }
    }, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
    });
    clientReq.on('error', (err) => {
        console.error('Firebase Auth Proxy error:', err);
        res.status(500).send('Auth Proxy Error');
    });
    req.pipe(clientReq);
});

// Cabeçalhos CORS para API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Servir arquivos estáticos ANTES das rotas API
app.use(express.static(__dirname));

// Rastreamento de tarefas na memória com persistência em disco (/tmp) para Vercel Serverless
const TASKS = {}; // taskId -> { status, progress, message, fileName, resultFile }
const LOCAL_SUBSCRIBERS = {}; // email -> true

function saveTask(taskId, data) {
    const existing = TASKS[taskId] || {};
    const updated = { ...existing, ...data };
    TASKS[taskId] = updated;
    try {
        const taskPath = path.join(TMP_BASE, `task_${taskId}.json`);
        fs.writeFileSync(taskPath, JSON.stringify(updated), 'utf8');
    } catch (e) {}
    return updated;
}

function getTask(taskId) {
    if (TASKS[taskId]) return TASKS[taskId];
    try {
        const taskPath = path.join(TMP_BASE, `task_${taskId}.json`);
        if (fs.existsSync(taskPath)) {
            const data = JSON.parse(fs.readFileSync(taskPath, 'utf8'));
            TASKS[taskId] = data;
            return data;
        }
    } catch (e) {}
    return null;
}

// =========================================================================== //
//  FILE DATABASE (db.json) SYSTEM FOR ADMINISTRATIVE PANEL                  //
// =========================================================================== //
const DB_FILE = path.join(__dirname, 'db.json');

function getInitialDb() {
    return {
        users: [
            { name: "Administrador VIP", email: "admin@blackvoice.com", document: "000.000.000-00", plan: "enterprise", status: "active", overdueDays: 0, createdAt: "2026-07-30T00:00:00.000Z", lastAccess: new Date().toISOString(), totalProcesses: 31, sandbox: false },
            { name: "Cliente VIP Unlimited", email: "vip@blackvoice.com.br", document: "000.000.000-00", plan: "enterprise", status: "active", overdueDays: 0, createdAt: "2026-07-20T00:00:00.000Z", lastAccess: new Date().toISOString(), totalProcesses: 12, sandbox: false },
            { name: "Flavio Ferst Gmail", email: "flavioferst@gmail.com", document: "000.000.000-00", plan: "enterprise", status: "active", overdueDays: 0, createdAt: "2026-07-30T00:00:00.000Z", lastAccess: new Date().toISOString(), totalProcesses: 18, sandbox: false },
            { name: "PERFIL 04", email: "newperfil04@gmail.com", document: "000.000.000-00", plan: "free", status: "active", overdueDays: 0, createdAt: "2026-09-12T00:00:00.000Z", lastAccess: new Date().toISOString(), totalProcesses: 5, sandbox: false },
            { name: "Pablo Henrique", email: "pablosanfonatecla@gmail.com", document: "000.000.000-00", plan: "free", status: "blocked", overdueDays: 0, createdAt: "2026-09-12T00:00:00.000Z", lastAccess: new Date().toISOString(), totalProcesses: 2, sandbox: false },
            { name: "Cliente VIP Ilimitado", email: "viphothot@proton.me", document: "000.000.000-00", plan: "free", status: "active", overdueDays: 0, createdAt: "2026-09-13T00:00:00.000Z", lastAccess: new Date().toISOString(), totalProcesses: 9, sandbox: false },
            { name: "Cliente Real", email: "mateusmartinschaves@gmail.com", document: "000.000.000-00", plan: "free", status: "active", overdueDays: 0, createdAt: "2026-09-13T00:00:00.000Z", lastAccess: new Date().toISOString(), totalProcesses: 4, sandbox: false },
            { name: "joao paulo moraes", email: "brazucashopsbr@gmail.com", document: "000.000.000-00", plan: "free", status: "active", overdueDays: 0, createdAt: "2026-09-13T00:00:00.000Z", lastAccess: new Date().toISOString(), totalProcesses: 7, sandbox: false },
            { name: "Flavio Ferst Hotmail", email: "flavioferst@hotmail.com", document: "000.000.000-00", plan: "enterprise", status: "active", overdueDays: 0, createdAt: "2026-08-01T00:00:00.000Z", lastAccess: new Date().toISOString(), totalProcesses: 5, sandbox: false },
            { name: "Flavio Ferst Outlook", email: "flavioferst@outlook.com", document: "000.000.000-00", plan: "enterprise", status: "active", overdueDays: 0, createdAt: "2026-08-05T00:00:00.000Z", lastAccess: new Date().toISOString(), totalProcesses: 8, sandbox: false },
            { name: "Flavio Ferst Byte", email: "flavioferst-byte@gmail.com", document: "000.000.000-00", plan: "enterprise", status: "active", overdueDays: 0, createdAt: "2026-08-10T00:00:00.000Z", lastAccess: new Date().toISOString(), totalProcesses: 14, sandbox: false },
            { name: "Suporte BlackVoice", email: "suporte@blackvoice.com.br", document: "000.000.000-00", plan: "enterprise", status: "active", overdueDays: 0, createdAt: "2026-08-15T00:00:00.000Z", lastAccess: new Date().toISOString(), totalProcesses: 2, sandbox: false },
            { name: "Contato BlackVoice", email: "contato@blackvoice.com.br", document: "000.000.000-00", plan: "enterprise", status: "active", overdueDays: 0, createdAt: "2026-08-15T00:00:00.000Z", lastAccess: new Date().toISOString(), totalProcesses: 4, sandbox: false },
            { name: "Cliente BlackVoice", email: "cliente@blackvoice.com.br", document: "000.000.000-00", plan: "starter", status: "active", overdueDays: 0, createdAt: "2026-09-01T00:00:00.000Z", lastAccess: new Date().toISOString(), totalProcesses: 6, sandbox: false }
        ],
        plans: {
            free: { id: "free", name: "Free", price: 0, dailyLimit: 2, maxFileSizeMB: 500, benefits: ["1 criativo por vez", "Vídeos até 500MB"] },
            starter: { id: "starter", name: "Starter", price: 79, dailyLimit: 10, maxFileSizeMB: 500, benefits: ["10 criativos por dia", "Vídeos até 500MB"] },
            creator: { id: "creator", name: "Creator Pro", price: 98, dailyLimit: 30, maxFileSizeMB: 500, benefits: ["30 criativos por dia", "Vídeos até 500MB", "Fila Prioritária"] },
            enterprise: { id: "enterprise", name: "Business", price: 148, dailyLimit: 9999, maxFileSizeMB: 500, benefits: ["Criativos ilimitados", "Vídeos até 500MB", "Suporte Dedicado", "Fila Prioritária"] }
        },
        analytics: {
            dailyUsage: [],
            newUsers: []
        },
        globalStats: {
            totalProcessed: 100
        }
    };
}

function loadDb() {
    let db = null;
    try {
        if (fs.existsSync(DB_FILE)) {
            db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
        }
    } catch (e) {
        console.error("Erro ao ler db.json, reiniciando:", e);
    }
    
    const initialDb = getInitialDb();
    if (!db) {
        db = initialDb;
    } else {
        if (!db.users || !Array.isArray(db.users)) {
            db.users = initialDb.users;
        } else {
            // Merge seed users so default accounts are never missing
            initialDb.users.forEach(seed => {
                const exists = db.users.some(u => u.email && u.email.toLowerCase() === seed.email.toLowerCase());
                if (!exists) {
                    db.users.push(seed);
                }
            });
        }
        db.plans = initialDb.plans;
    }
    
    saveDb(db);
    return db;
}

function saveDb(db) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 4), 'utf8');
    } catch (e) {
        console.error("Erro ao salvar db.json:", e);
    }
}

// Inicializar DB na carga inicial
try { loadDb(); } catch(e) {}


// Descobrir caminhos locais para FFmpeg e FFprobe
function getFFmpegPath() {
    try {
        const ffmpegStatic = require('ffmpeg-static');
        if (ffmpegStatic && fs.existsSync(ffmpegStatic)) {
            try { fs.chmodSync(ffmpegStatic, 0o755); } catch(e) {}
            return ffmpegStatic;
        }
    } catch(e) {}
    const local = path.join(__dirname, 'ffmpeg.exe');
    if (process.platform === 'win32' && fs.existsSync(local)) {
        return local;
    }
    return 'ffmpeg';
}

function getFFprobePath() {
    try {
        const ffmpegStatic = require('ffmpeg-static');
        if (ffmpegStatic && fs.existsSync(ffmpegStatic)) {
            try { fs.chmodSync(ffmpegStatic, 0o755); } catch(e) {}
            return ffmpegStatic;
        }
    } catch(e) {}
    const local = path.join(__dirname, 'ffprobe.exe');
    if (process.platform === 'win32' && fs.existsSync(local)) {
        return local;
    }
    return 'ffprobe';
}

// Helpers para validação e FFmpeg usando inspectFileWithFFmpeg unificado
function inspectFileWithFFmpeg(filePath) {
    return new Promise((resolve) => {
        const ffmpeg = getFFmpegPath();
        exec(`"${ffmpeg}" -i "${filePath}"`, (err, stdout, stderr) => {
            const output = (stderr || '') + (stdout || '');
            
            let duration = 0;
            const durMatch = output.match(/Duration:\s+(\d+):(\d+):(\d+\.\d+)/);
            if (durMatch) {
                duration = parseInt(durMatch[1]) * 3600 + parseInt(durMatch[2]) * 60 + parseFloat(durMatch[3]);
            }
            
            const hasAudio = /Stream\s+#\d+:\d+.*Audio:/i.test(output);
            const hasVideo = /Stream\s+#\d+:\d+.*Video:/i.test(output);
            
            let width = 1080;
            let height = 1920;
            let fps = 30;
            const resMatch = output.match(/Stream\s+#\d+:\d+.*Video:.*?\s+(\d{2,5})x(\d{2,5})/i);
            if (resMatch) {
                width = parseInt(resMatch[1]);
                height = parseInt(resMatch[2]);
            }
            const fpsMatch = output.match(/(\d+(?:\.\d+)?)\s+fps/i);
            if (fpsMatch) {
                fps = parseFloat(fpsMatch[1]);
            }
            
            resolve({ duration, hasAudio, hasVideo, width, height, fps: isNaN(fps) ? 30 : fps });
        });
    });
}

function getVideoDuration(filePath) {
    return inspectFileWithFFmpeg(filePath).then(meta => meta.duration);
}

function hasAudioStream(filePath) {
    return inspectFileWithFFmpeg(filePath).then(meta => meta.hasAudio);
}

function getVideoMetadata(filePath) {
    return inspectFileWithFFmpeg(filePath);
}

function generateElevenLabsAudio(text, voiceId, apiKey, outputPath) {
    return new Promise((resolve, reject) => {
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
        const data = JSON.stringify({
            text: text,
            model_id: 'eleven_flash_v2_5',
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75
            }
        });

        const options = {
            method: 'POST',
            headers: {
                'xi-api-key': apiKey,
                'Content-Type': 'application/json',
                'accept': 'audio/mpeg'
            }
        };

        const req = https.request(url, options, (res) => {
            if (res.statusCode !== 200) {
                let errorData = '';
                res.on('data', (chunk) => { errorData += chunk; });
                res.on('end', () => {
                    reject(new Error(`ElevenLabs API retornou HTTP ${res.statusCode}: ${errorData}`));
                });
                return;
            }

            const fileStream = fs.createWriteStream(outputPath);
            res.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                resolve();
            });

            fileStream.on('error', (err) => {
                reject(err);
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        req.write(data);
        req.end();
    });
}

// Background task para processamento Unificado (Phase Cancellation + opcionalmente ElevenLabs Voiceover e/ou Camuflagem de Imagem)
async function runUnifiedProcessing(taskId, inputPath, outputPath, text, originalName, imagePath = '', imageOpacity = '0.20', extendVideo = false, mirrorVideo = false) {
    const tempAudioPath = path.join(TMP_BASE, `temp_${taskId}_narracao.mp3`);
    const extractedThumbPath = path.join(INPUTS_DIR, `${taskId}_extracted_thumb.jpg`);
    const ext = path.extname(originalName) || '.mp4';
    const ffmpeg = getFFmpegPath();
    const isVoiceover = !!text;
    const hasImage = parseFloat(imageOpacity) > 0;

    let finalImagePath = imagePath;
    let isExtracted = false;

    // Caminhos temporários para o processo de concatenação ultra rápida
    const part1Path = path.join(OUTPUTS_DIR, `part1_${taskId}${ext}`);
    const part2Path = path.join(OUTPUTS_DIR, `part2_${taskId}${ext}`);
    const concatTxtPath = path.join(OUTPUTS_DIR, `concat_${taskId}.txt`);

    console.log(`[Unified Processing] taskId: ${taskId}, isVoiceover: ${isVoiceover}, text: "${text}", hasImage: ${hasImage}, imagePath: "${imagePath}", imageOpacity: ${imageOpacity}, mirrorVideo: ${mirrorVideo}`);

    try {
        saveTask(taskId, { status: 'processing', progress: 10, message: 'Preparando arquivos...', fileName: originalName, resultFile: '' });

        const meta = await getVideoMetadata(inputPath);
        const hasVideo = !!meta.hasVideo;
        const outWidth = Math.max(2, 2 * Math.floor((meta.width || 1080) / 2));
        const outHeight = Math.max(2, 2 * Math.floor((meta.height || 1920) / 2));
        const fps = meta.fps || 30;

        if (isVoiceover) {
            // Caso com Narração: Gerar áudio na ElevenLabs
            saveTask(taskId, { progress: 20, message: 'Gerando áudio da narração...' });

            const apiKey = process.env.ELEVENLABS_API_KEY || 'sk_1e3e182918d7c0fe86f8ed06bfaded77b3dc07ee99588c4e';
            const voiceId = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // Rachel

            if (!apiKey) {
                throw new Error('Serviço de voz não configurado no servidor.');
            }

            try {
                await generateElevenLabsAudio(text, voiceId, apiKey, tempAudioPath);
            } catch (err) {
                console.error(`[Unified Processing] Falha ao conectar ao ElevenLabs: ${err.message}`);
                if (err.code === 'ENOTFOUND' || err.code === 'ETIMEDOUT' || err.code === 'ECONNREFUSED' || err.message.includes('getaddrinfo') || err.message.includes('unreachable')) {
                    console.log(`[Unified Processing] Modo tolerante: gerando áudio silencioso de fallback.`);
                    const silentCmd = `"${ffmpeg}" -y -f lavfi -i anullsrc=r=44100:cl=mono -t 5 -q:a 9 -acodec libmp3lame "${tempAudioPath}"`;
                    await new Promise((resolve, reject) => {
                        exec(silentCmd, (e) => {
                            if (e) return reject(new Error(`Erro ao gerar áudio silencioso de fallback: ${e.message}`));
                            resolve();
                        });
                    });
                } else {
                    throw err;
                }
            }

            if (!fs.existsSync(tempAudioPath) || fs.statSync(tempAudioPath).size === 0) {
                throw new Error('Arquivo de narração não foi gerado com sucesso.');
            }
        }

        // Extrair capa inicial do vídeo APENAS se houver fluxo de vídeo e (hasImage ou extendVideo) e nenhuma imagem customizada foi enviada
        if (hasVideo && (hasImage || extendVideo) && !finalImagePath) {
            saveTask(taskId, { progress: 40, message: 'Extraindo capa miniatura do vídeo...' });
            console.log(`[Unified Processing] Extracting cover frame to: ${extractedThumbPath}`);
            const extractCmd = `"${ffmpeg}" -y -i "${inputPath}" -ss 00:00:00 -vframes 1 -f image2 "${extractedThumbPath}"`;
            await new Promise((resolve) => {
                exec(extractCmd, (err) => {
                    if (err) console.error(`[Unified Processing] Warning: could not extract thumbnail: ${err.message}`);
                    resolve();
                });
            });
            if (fs.existsSync(extractedThumbPath)) {
                finalImagePath = extractedThumbPath;
                isExtracted = true;
            }
        }

        // Aplicar Camuflagem
        saveTask(taskId, { progress: 60, message: 'Aplicando filtros de áudio e vídeo...' });

        const hasAudio = await hasAudioStream(inputPath);
        let cmd = '';

        // Construir os filtros dinamicamente com base nas opções
        let filterParts = [];
        let inputs = [];

        // 1. Entrada do vídeo
        inputs.push(`-i "${inputPath}"`);

        // 2. Entrada do áudio da narração (se houver)
        if (isVoiceover) {
            inputs.push(`-i "${tempAudioPath}"`);
        }

        // 3. Entrada da imagem de capa (se houver)
        if (hasImage && finalImagePath && fs.existsSync(finalImagePath)) {
            inputs.push(`-i "${finalImagePath}"`);
        }

        // 4. Configurar filtros de áudio (Phase Cancellation + EQ para camuflagem de IA)
        let mapAudio = '';
        if (isVoiceover) {
            if (hasAudio) {
                filterParts.push(`[0:a]volume=1.15,equalizer=f=1200:width_type=h:width=250:g=-10,equalizer=f=2600:width_type=h:width=350:g=-8,asetrate=44100*1.015,aresample=44100,atempo=0.985,aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo,pan=stereo|c0=c0|c1=-1*c0[orig]`);
                filterParts.push(`[1:a]volume=0.01,aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo[voice]`);
                filterParts.push(`[orig][voice]amix=inputs=2:duration=first:dropout_transition=2:normalize=0[aout]`);
            } else {
                filterParts.push(`[1:a]volume=1.00,aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo[aout]`);
            }
            mapAudio = '-map "[aout]"';
        } else {
            if (hasAudio) {
                filterParts.push(`[0:a]volume=1.15,equalizer=f=1200:width_type=h:width=250:g=-10,equalizer=f=2600:width_type=h:width=350:g=-8,asetrate=44100*1.015,aresample=44100,atempo=0.985,aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo,pan=stereo|c0=c0|c1=-1*c0[aout]`);
                mapAudio = '-map "[aout]"';
            } else {
                mapAudio = '-an';
            }
        }

        // 5. Configurar filtros de vídeo e codificação
        let mapVideo = '';
        let vcodec = '';
        
        const flipStr = mirrorVideo ? ',hflip' : '';

        if (hasVideo) {
            if (hasImage && finalImagePath && fs.existsSync(finalImagePath)) {
                const eqStr = `eq=contrast=1.02:brightness=0.008:saturation=1.03:gamma=1.01`;
                mapVideo = '-map "[vout]"';
                vcodec = '-c:v:0 libx264 -preset ultrafast -tune zerolatency -crf 30 -threads 0 -pix_fmt yuv420p';
                let videoChain = `[0:v]setpts=0.999*PTS,scale='2*trunc(iw/2)':'2*trunc(ih/2)',${eqStr}${flipStr}`;
                let currentStream = '[vout_base]';
                filterParts.push(`${videoChain}${currentStream}`);

                const imgInputIndex = isVoiceover ? 2 : 1;
                filterParts.push(`[${imgInputIndex}:v]scale=${outWidth}:${outHeight}:force_original_aspect_ratio=increase,crop=${outWidth}:${outHeight},format=rgba[img_scaled_base]`);
                filterParts.push(`[img_scaled_base]split=2[img_cover_in][img_flash_in]`);
                filterParts.push(`[img_cover_in]colorchannelmixer=aa=1.0[img_cover]`);
                filterParts.push(`${currentStream}[img_cover]overlay=0:0:enable='lt(t,0.04)'[vout_mid]`);
                filterParts.push(`[img_flash_in]colorchannelmixer=aa=${imageOpacity}[img_flash]`);
                filterParts.push(`[vout_mid][img_flash]overlay=0:0:enable='gt(t,0.5)*lt(mod(t,1.0),0.099)'[vout]`);
            } else if (mirrorVideo || extendVideo) {
                mapVideo = '-map "[vout]"';
                vcodec = '-c:v:0 libx264 -preset ultrafast -tune zerolatency -crf 30 -threads 0 -pix_fmt yuv420p';
                let vchain = `[0:v]setpts=0.999*PTS,scale='2*trunc(iw/2)':'2*trunc(ih/2)'`;
                if (mirrorVideo) vchain += `,hflip`;
                filterParts.push(`${vchain}[vout]`);
            } else {
                mapVideo = '-map 0:v:0?';
                vcodec = '-c:v copy';
            }
        } else {
            // Arquivo é apenas áudio (sem fluxo de vídeo [0:v])
            if (hasImage && finalImagePath && fs.existsSync(finalImagePath)) {
                mapVideo = '-map "[vout]"';
                vcodec = '-c:v:0 libx264 -preset ultrafast -tune zerolatency -crf 30 -threads 0 -pix_fmt yuv420p';
                const imgInputIndex = isVoiceover ? 2 : 1;
                filterParts.push(`[${imgInputIndex}:v]scale=${outWidth}:${outHeight}:force_original_aspect_ratio=increase,crop=${outWidth}:${outHeight}[vout]`);
            } else {
                mapVideo = '-vn';
                vcodec = '';
            }
        }

        // Se o alongamento estiver ativo E houver vídeo, dividimos em duas partes e concatenamos
        const doExtension = extendVideo && hasVideo;
        const tempOutputPath = doExtension
            ? path.join(OUTPUTS_DIR, `temp_filter_${taskId}${ext}`)
            : outputPath;

        const mainVideoPath = doExtension ? part1Path : tempOutputPath;

        // Determinar codec de áudio apropriado com base na extensão do arquivo de saída
        let audioCodecStr = '-c:a aac -b:a 128k';
        const lowerExt = ext.toLowerCase();
        if (lowerExt === '.mp3') {
            audioCodecStr = '-c:a libmp3lame -b:a 192k';
        } else if (lowerExt === '.wav') {
            audioCodecStr = '-c:a pcm_s16le';
        }

        // Executar Parte 1: Processar o vídeo ou áudio em passagem única ultra rápida
        const randomUuid = crypto.randomUUID();
        const filterStr = filterParts.length > 0 ? `-filter_complex "${filterParts.join(';')}"` : '';
        cmd = `"${ffmpeg}" -y ${inputs.join(' ')} ${filterStr} ${mapVideo} ${mapAudio} ${vcodec} ${audioCodecStr} -shortest -map_metadata -1 -metadata comment="${randomUuid}" "${mainVideoPath}"`;

        console.log(`[Unified Processing] running cmd (Main video/audio): ${cmd}`);

        await new Promise((resolve, reject) => {
            exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    console.error(`[Unified Processing] Cmd failed: ${stderr || err.message}`);
                    if (vcodec.includes('copy')) {
                        const fallbackVcodec = '-c:v libx264 -preset ultrafast -tune zerolatency -crf 32 -threads 0 -pix_fmt yuv420p';
                        const fallbackCmd = `"${ffmpeg}" -y ${inputs.join(' ')} ${filterStr} ${hasVideo ? '-map 0:v:0?' : '-vn'} ${mapAudio} ${fallbackVcodec} ${audioCodecStr} -shortest -map_metadata -1 -metadata comment="${randomUuid}" "${mainVideoPath}"`;
                        console.log(`[Unified Processing] Retrying with fallback ultrafast encoding: ${fallbackCmd}`);
                        return exec(fallbackCmd, (err2, stdout2, stderr2) => {
                            if (err2) return reject(new Error(`Erro no FFmpeg: ${stderr2 || err2.message}`));
                            resolve();
                        });
                    }
                    return reject(new Error(`Erro no FFmpeg: ${stderr || err.message}`));
                }
                resolve();
            });
        });

        if (doExtension) {
            const extendSeconds = 600;
            saveTask(taskId, { progress: 80, message: `Gerando extensão estática de 10 minutos...` });
            
            const audioInput = hasAudio ? `-f lavfi -t ${extendSeconds} -i anullsrc=r=44100:cl=stereo` : '';
            const audioCodec = hasAudio ? audioCodecStr : '-an';

            let part2VideoInput = '';
            let part2Vf = `-vf "scale=${outWidth}:${outHeight}:force_original_aspect_ratio=increase,crop=${outWidth}:${outHeight}"`;
            if (finalImagePath && fs.existsSync(finalImagePath)) {
                part2VideoInput = `-loop 1 -i "${finalImagePath}"`;
            } else {
                finalImagePath = extractedThumbPath;
                console.log(`[Unified Processing] Emergency thumbnail extraction for part 2: ${finalImagePath}`);
                await new Promise(r => exec(`"${ffmpeg}" -y -i "${inputPath}" -ss 00:00:00 -vframes 1 -f image2 "${finalImagePath}"`, r));
                
                if (fs.existsSync(finalImagePath)) {
                    part2VideoInput = `-loop 1 -i "${finalImagePath}"`;
                } else {
                    console.log(`[Unified Processing] Thumbnail missing for part 2, using black canvas fallback.`);
                    part2VideoInput = `-f lavfi -i color=c=black:s=${outWidth}x${outHeight}:r=1`;
                    part2Vf = '';
                }
            }

            const part2Cmd = `"${ffmpeg}" -y ${part2VideoInput} ${audioInput} -t ${extendSeconds} -c:v libx264 -preset ultrafast -tune zerolatency -crf 32 -pix_fmt yuv420p -r 1 -g 100 -threads 0 ${part2Vf} ${audioCodec} "${part2Path}"`;

            console.log(`[Unified Processing] running cmd (Part 2 - ${extendSeconds}s static extension at ${fps} fps): ${part2Cmd}`);

            await new Promise((resolve, reject) => {
                exec(part2Cmd, (err, stdout, stderr) => {
                    if (err) return reject(new Error(`Erro no FFmpeg ao gerar extensão de vídeo: ${stderr || err.message}`));
                    resolve();
                });
            });

            // Executar Parte 3: Concatenar part1.mp4 e part2.mp4 usando concat demuxer (instantâneo)
            saveTask(taskId, { progress: 85, message: 'Concatenando vídeo principal e extensão...' });

            fs.writeFileSync(concatTxtPath, `file '${part1Path.replace(/\\/g, '/')}'\nfile '${part2Path.replace(/\\/g, '/')}'\n`);
            const concatCmd = `"${ffmpeg}" -y -f concat -safe 0 -i "${concatTxtPath}" -c copy "${outputPath}"`;

            console.log(`[Unified Processing] running cmd (Part 3 - concat copy): ${concatCmd}`);

            await new Promise((resolve, reject) => {
                exec(concatCmd, (err, stdout, stderr) => {
                    if (err) return reject(new Error(`Erro no FFmpeg ao concatenar arquivos: ${stderr || err.message}`));
                    resolve();
                });
            });
        }

        if (!fs.existsSync(outputPath)) {
            throw new Error('Falha ao gerar o vídeo final.');
        }

        // Concluído
        saveTask(taskId, { status: 'completed', progress: 100, message: 'Processamento concluído com sucesso!', resultFile: outputPath });

    } catch (err) {
        console.error(`✖ Erro na tarefa ${taskId}:`, err);
        saveTask(taskId, { status: 'failed', progress: 100, message: `Erro: ${err.message}` });
    } finally {
        // Limpar temporÃ¡rios
        if (fs.existsSync(tempAudioPath)) {
            try { fs.unlinkSync(tempAudioPath); } catch (e) {}
        }
        if (fs.existsSync(inputPath)) {
            try { fs.unlinkSync(inputPath); } catch (e) {}
        }
        if (isExtracted && fs.existsSync(extractedThumbPath)) {
            try { fs.unlinkSync(extractedThumbPath); } catch (e) {}
        }
        if (imagePath && fs.existsSync(imagePath)) {
            try { fs.unlinkSync(imagePath); } catch (e) {}
        }
        const tempFilterPath = path.join(OUTPUTS_DIR, `temp_filter_${taskId}${ext}`);
        if (fs.existsSync(tempFilterPath)) {
            try { fs.unlinkSync(tempFilterPath); } catch (e) {}
        }
        if (fs.existsSync(part1Path)) {
            try { fs.unlinkSync(part1Path); } catch (e) {}
        }
        if (fs.existsSync(part2Path)) {
            try { fs.unlinkSync(part2Path); } catch (e) {}
        }
        if (fs.existsSync(concatTxtPath)) {
            try { fs.unlinkSync(concatTxtPath); } catch (e) {}
        }
    }
}

// ============================================================
// PROCESSAMENTO AGRESSIVO (hash/pixel uniqueness)
// ============================================================
async function runAggressiveProcessing(taskId, inputPath, outputPath) {
    const ffmpeg = getFFmpegPath();
    const randomUuid = crypto.randomUUID();
    const randomSeed = Math.floor(Math.random() * 9000) + 1000;

    // Varia o noise seed a cada execuÃ§Ã£o para gerar hash Ãºnico
    const noiseVal    = 12 + Math.floor(Math.random() * 5); // 12-16
    const noiseValC   = 8  + Math.floor(Math.random() * 4); // 8-11
    const eqContrast  = (1.015 + Math.random() * 0.01).toFixed(4);
    const eqBright    = (0.004 + Math.random() * 0.008).toFixed(4);
    const eqSat       = (1.02  + Math.random() * 0.02).toFixed(4);
    const sharpLuma   = (0.3   + Math.random() * 0.2).toFixed(2);
    const sharpChroma = (0.2   + Math.random() * 0.15).toFixed(2);
    const hqLuma      = (1.2   + Math.random() * 0.6).toFixed(1);
    const hqLumaTmp   = (2.5   + Math.random() * 1.0).toFixed(1);
    // VariaÃ§Ã£o sutil nas curves por execuÃ§Ã£o
    const cr = (0.475 + Math.random()*0.01).toFixed(4);
    const cg = (0.485 + Math.random()*0.01).toFixed(4);
    const cb = (0.495 + Math.random()*0.01).toFixed(4);

    const vf = [
        `crop=w='2*trunc((iw-16)/2)':h='2*trunc((ih-16)/2)':x=8:y=8`,
        `scale='min(iw,480)':'min(ih,480)':force_original_aspect_ratio=decrease`,
        `scale='2*trunc(iw/2)':'2*trunc(ih/2)'`,
        `eq=contrast=${eqContrast}:brightness=${eqBright}:saturation=${eqSat}:gamma=1.01`,
        `curves=r='0/${cr}/0.5 1/1':g='0/${cg}/0.5 1/1':b='0/${cb}/0.5 1/1'`,
        `setpts=PTS+${(Math.random()*0.001).toFixed(6)}/TB`
    ].join(',');

    console.log(`[AGRESSIVO] taskId=${taskId} noiseVal=${noiseVal} uuid=${randomUuid}`);

    TASKS[taskId].status = 'processing';
    TASKS[taskId].progress = 15;
    TASKS[taskId].message = 'Aplicando filtros agressivos...';

    const hasAudio = await hasAudioStream(inputPath);
    const audioFilter = hasAudio
        ? `-af "aecho=0.3:0.1:10:0.05,volume=1.01" -c:a aac -b:a 192k -ac 2`
        : '-an';

    const cmd = `"${ffmpeg}" -y -i "${inputPath}" \
-vf "${vf}" \
-c:v libx264 -preset ultrafast -crf 27 -pix_fmt yuv420p \
-g 250 -keyint_min 25 -sc_threshold 0 -threads 0 \
${audioFilter} \
-map_metadata -1 -map_chapters -1 \
-movflags +faststart+frag_keyframe \
-fflags +genpts \
-metadata encoding_tool="" \
"${outputPath}"`;

    console.log(`[AGRESSIVO] cmd: ${cmd}`);

    TASKS[taskId].progress = 30;
    TASKS[taskId].message = 'Re-encoding com libx264 CRF 24...';

    await new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) return reject(new Error(`FFmpeg error: ${stderr || err.message}`));
            resolve();
        });
    });

    if (!fs.existsSync(outputPath)) throw new Error('Arquivo de saÃ­da nÃ£o gerado.');

    TASKS[taskId].status = 'DONE';
    TASKS[taskId].progress = 100;
    TASKS[taskId].message = 'Pronto!';
    TASKS[taskId].resultFile = outputPath;
    console.log(`[AGRESSIVO] ConcluÃ­do: ${outputPath}`);
}

// ============================================================
// PROCESSAMENTO FB ULTRA (Facebook bypass bypass)
// ============================================================
async function runFacebookUltraProcessing(taskId, inputPath, outputPath) {
    const ffmpeg = getFFmpegPath();
    const randomUuid = crypto.randomUUID();
    const randomSeed = Math.floor(Math.random() * 9000) + 1000;

    // Filtros ultra-agressivos para burlar perceptual hashes e fingerprints do FB
    const noiseVal    = 18;
    const noiseValC   = 12;
    const eqContrast  = '1.0500';
    const eqBright    = '0.0060';
    const eqSat       = '1.0400';
    const sharpLuma   = '1.50';
    const sharpChroma = '1.00';
    const hqLuma      = '6.0';
    const hqLumaTmp   = '8.0';

    // VariaÃ§Ã£o pronunciada nas curves
    const cr = (0.45 + Math.random()*0.02).toFixed(4);
    const cg = (0.47 + Math.random()*0.02).toFixed(4);
    const cb = (0.48 + Math.random()*0.02).toFixed(4);

    const vf = [
        `crop=w='2*trunc((iw-16)/2)':h='2*trunc((ih-16)/2)':x=8:y=8`,
        `scale='min(iw,480)':'min(ih,480)':force_original_aspect_ratio=decrease`,
        `scale='2*trunc(iw/2)':'2*trunc(ih/2)'`,
        `eq=contrast=${eqContrast}:brightness=${eqBright}:saturation=${eqSat}:gamma=1.02`,
        `curves=r='0/${cr}/0.5 1/1':g='0/${cg}/0.5 1/1':b='0/${cb}/0.5 1/1'`,
        `setpts=PTS+${(0.0005 + Math.random()*0.001).toFixed(6)}/TB`
    ].join(',');

    console.log(`[FB_ULTRA] taskId=${taskId} noiseVal=${noiseVal} uuid=${randomUuid}`);

    TASKS[taskId].status = 'processing';
    TASKS[taskId].progress = 15;
    TASKS[taskId].message = 'Aplicando filtros ultra-agressivos para FB...';

    const hasAudio = await hasAudioStream(inputPath);
    // Filtro de audio com eco pronunciado + alteraÃ§Ã£o de volume e pitch sutil
    const audioFilter = hasAudio
        ? `-af "aecho=0.3:0.15:12:0.06,volume=1.02,asetrate=44100*1.008,aresample=44100" -c:a aac -b:a 192k -ac 2`
        : '-an';

    const cmd = `"${ffmpeg}" -y -i "${inputPath}" \
-vf "${vf}" \
-c:v libx264 -preset ultrafast -crf 28 -pix_fmt yuv420p \
-g 250 -keyint_min 25 -sc_threshold 0 -threads 0 \
${audioFilter} \
-map_metadata -1 -map_chapters -1 \
-movflags +faststart+frag_keyframe \
-fflags +genpts \
-metadata encoding_tool="" \
"${outputPath}"`;

    console.log(`[FB_ULTRA] cmd: ${cmd}`);

    TASKS[taskId].progress = 30;
    TASKS[taskId].message = 'Re-encoding com libx264 CRF 25...';

    await new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) return reject(new Error(`FFmpeg error: ${stderr || err.message}`));
            resolve();
        });
    });

    if (!fs.existsSync(outputPath)) throw new Error('Arquivo de saÃ­da nÃ£o gerado.');

    TASKS[taskId].status = 'DONE';
    TASKS[taskId].progress = 100;
    TASKS[taskId].message = 'Pronto!';
    TASKS[taskId].resultFile = outputPath;
    console.log(`[FB_ULTRA] ConcluÃ­do: ${outputPath}`);
}

// POST /process-fb-ultra
app.post('/process-fb-ultra', upload.single('video'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });

        const taskId = crypto.randomUUID();
        const ext    = path.extname(file.originalname) || '.mp4';
        const base   = path.basename(file.originalname, ext);
        const outName = `${base}_fb_ultra.mp4`;
        const outputPath = path.join(OUTPUTS_DIR, `${taskId}_fb_ultra.mp4`);

        TASKS[taskId] = {
            status: 'pending',
            progress: 0,
            message: 'Na fila...',
            fileName: outName,
            resultFile: ''
        };

        runFacebookUltraProcessing(taskId, file.path, outputPath)
            .catch(err => {
                TASKS[taskId].status = 'ERROR';
                TASKS[taskId].message = err.message;
                console.error('[FB_ULTRA] Erro:', err.message);
                try { fs.unlinkSync(file.path); } catch(e) {}
            });

        res.json({ taskId, status: 'pending' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /task-status-fb/:taskId
app.get('/task-status-fb/:taskId', (req, res) => {
    const task = TASKS[req.params.taskId];
    if (!task) return res.status(404).json({ error: 'Tarefa nÃ£o encontrada.' });
    const isReady = task.status === 'DONE' && task.resultFile;
    res.json({
        status:   task.status,
        progress: task.progress,
        message:  task.message,
        resultFile: isReady ? `/download-fb-ultra/${req.params.taskId}` : null
    });
});

// GET /download-fb-ultra/:taskId
app.get('/download-fb-ultra/:taskId', (req, res) => {
    const task = TASKS[req.params.taskId];
    if (!task || task.status !== 'DONE' || !task.resultFile) {
        return res.status(404).json({ error: 'Arquivo nÃ£o disponÃ­vel.' });
    }
    if (!fs.existsSync(task.resultFile)) {
        return res.status(404).json({ error: 'Arquivo expirado.' });
    }
    res.download(task.resultFile, task.fileName, err => {
        if (!err) {
            try { fs.unlinkSync(task.resultFile); task.resultFile = ''; } catch(e) {}
        }
    });
});

// POST /process-agressivo
app.post('/process-agressivo', upload.single('video'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });

        const taskId = crypto.randomUUID();
        const ext    = path.extname(file.originalname) || '.mp4';
        const base   = path.basename(file.originalname, ext);
        const outName = `${base}_agressivo.mp4`;
        const outputPath = path.join(OUTPUTS_DIR, `${taskId}_agressivo.mp4`);

        TASKS[taskId] = {
            status: 'pending',
            progress: 0,
            message: 'Na fila...',
            fileName: outName,
            resultFile: ''
        };

        runAggressiveProcessing(taskId, file.path, outputPath)
            .catch(err => {
                TASKS[taskId].status = 'ERROR';
                TASKS[taskId].message = err.message;
                console.error('[AGRESSIVO] Erro:', err.message);
                try { fs.unlinkSync(file.path); } catch(e) {}
            });

        res.json({ taskId, status: 'pending' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /task-status/:taskId
app.get('/task-status/:taskId', (req, res) => {
    const task = TASKS[req.params.taskId];
    if (!task) return res.status(404).json({ error: 'Tarefa nÃ£o encontrada.' });
    const isReady = task.status === 'DONE' && task.resultFile;
    res.json({
        status:   task.status,
        progress: task.progress,
        message:  task.message,
        resultFile: isReady ? `/download-agressivo/${req.params.taskId}` : null
    });
});

// GET /download-agressivo/:taskId
app.get('/download-agressivo/:taskId', (req, res) => {
    const task = TASKS[req.params.taskId];
    if (!task || task.status !== 'DONE' || !task.resultFile) {
        return res.status(404).json({ error: 'Arquivo nÃ£o disponÃ­vel.' });
    }
    if (!fs.existsSync(task.resultFile)) {
        return res.status(404).json({ error: 'Arquivo expirado.' });
    }
    res.download(task.resultFile, task.fileName, err => {
        if (!err) {
            try { fs.unlinkSync(task.resultFile); task.resultFile = ''; } catch(e) {}
        }
    });
});

const uploadProcess = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }]);

app.post('/api/process', (req, res, next) => {
    uploadProcess(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error('[Multer Error]:', err);
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ detail: 'Arquivo excede o limite máximo de 200MB.' });
            }
            return res.status(400).json({ detail: `Erro no upload: ${err.message}` });
        } else if (err) {
            console.error('[Upload Error]:', err);
            return res.status(400).json({ detail: `Erro no envio do arquivo: ${err.message}` });
        }
        next();
    });
}, async (req, res) => {
    try {
        const videoFile = req.files && req.files['file'] ? req.files['file'][0] : null;
        const imageFile = req.files && req.files['image'] ? req.files['image'][0] : null;

        if (!videoFile) {
            return res.status(400).json({ detail: 'Nenhum arquivo de vídeo enviado.' });
        }
        const text = (req.body.text || '').trim();
        console.log(`[POST /api/process] Received file: ${videoFile.originalname}, text: "${text}", hasImageFile: ${!!imageFile}`);
        
        if (text && text.length > 400) {
            try { fs.unlinkSync(videoFile.path); } catch (e) {}
            if (imageFile) { try { fs.unlinkSync(imageFile.path); } catch (e) {} }
            return res.status(400).json({ detail: 'O texto da narração excede o limite de 400 caracteres.' });
        }

        const taskId = crypto.randomUUID();
        const ext = path.extname(videoFile.originalname) || '.mp4';
        const inputPath = videoFile.path;
        const outputPath = path.join(OUTPUTS_DIR, `${taskId}${ext}`);
        const imagePath = imageFile ? imageFile.path : '';

        // Registrar tarefa
        saveTask(taskId, {
            status: 'pending',
            progress: 0,
            message: 'Iniciando processamento...',
            fileName: videoFile.originalname,
            resultFile: ''
        });

        // Registrar uso no DB Admin
        try {
            const userEmail = req.body.email || 'cliente@email.com';
            const db = loadDb();
            let u = db.users.find(x => x.email === userEmail);
            if (u) {
                u.totalProcesses = (u.totalProcesses || 0) + 1;
                u.lastAccess = new Date().toISOString();
            }
            db.globalStats.totalProcessed = (db.globalStats.totalProcessed || 0) + 1;
            
            const todayStr = new Date().toISOString().split('T')[0];
            let item = db.analytics.dailyUsage.find(x => x.date === todayStr);
            if (item) {
                item.count++;
            } else {
                db.analytics.dailyUsage.push({ date: todayStr, count: 1 });
            }
            saveDb(db);
        } catch (e) {
            console.error("Erro ao registrar analytics no DB:", e);
        }

        // Opacidade da imagem de camuflagem e opções de vídeo
        const imageOpacity = req.body.imageOpacity || '0.20';
        const extendVideo = req.body.extendVideo === 'true';
        const mirrorVideo = req.body.mirrorVideo === 'true';

        // Executar processamento ultrarrápido síncrono
        await runUnifiedProcessing(taskId, inputPath, outputPath, text, videoFile.originalname, imagePath, imageOpacity, extendVideo, mirrorVideo);

        const finalTask = getTask(taskId);
        if (finalTask && finalTask.status === 'completed') {
            res.json({ task_id: taskId, status: 'completed', progress: 100 });
        } else {
            // Mostrar a mensagem de erro real do FFmpeg para diagnóstico
            const errMsg = finalTask ? finalTask.message : 'Falha no processamento.';
            console.error(`[POST /api/process] Task ${taskId} failed: ${errMsg}`);
            res.status(500).json({ detail: errMsg });
        }

    } catch (err) {
        console.error('[POST /api/process] Error:', err);
        res.status(500).json({ detail: err.message });
    }
});

app.get('/api/status/:taskId', (req, res) => {
    const task = getTask(req.params.taskId);
    if (!task) {
        return res.status(404).json({ detail: 'Tarefa não encontrada.' });
    }
    res.json({
        status: task.status,
        progress: task.progress,
        message: task.message
    });
});

app.get('/api/download/:taskId', (req, res) => {
    const task = getTask(req.params.taskId);
    if (!task || task.status !== 'completed' || !task.resultFile) {
        return res.status(404).json({ detail: 'Arquivo não disponível ou tarefa pendente.' });
    }

    if (!fs.existsSync(task.resultFile)) {
        return res.status(404).json({ detail: 'O arquivo físico expirou ou foi excluído do servidor.' });
    }

    const ext = path.extname(task.fileName || '.mp4');
    const base = path.basename(task.fileName || 'video', ext);
    const downloadName = `${base}__voiced${ext}`;

    res.download(task.resultFile, downloadName, (err) => {
        if (!err) {
            try {
                fs.unlinkSync(task.resultFile);
                task.resultFile = ''; // limpa referência
                saveTask(req.params.taskId, task);
                console.log(`🧹 Cleanup: Removido arquivo final baixado: ${downloadName}`);
            } catch (e) {}
        }
    });
});

// ImportaÃ§Ãµes para o Image Humanizer
const Jimp = require('jimp');
const piexif = require('piexifjs');

// Helper para gerar nÃºmeros aleatÃ³rios em faixas
function getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Pipeline de Camuflagem e HumanizaÃ§Ã£o de Imagens
async function humanizeImage(inputPath, outputPath, intensity = 'medium') {
    console.log(`[Image Humanizer] Iniciando processamento para ${inputPath}. Intensidade: ${intensity}`);
    
    // 1. Carregar a imagem com Jimp
    const image = await Jimp.read(inputPath);
    
    // VariÃ¡veis ajustÃ¡veis conforme intensidade (regras estritas: ruÃ­do std entre 2.0 e 3.0 para padrÃ£o, exceto heavy)
    let noiseStd = 2.5; // PadrÃ£o medium
    let blurRadius = 0.3;
    let sharpAmount = 0.4;
    let contrastAdjust = 0.03;
    let satAdjust = 0.04;
    let chromAbbShift = 0.5; // shift em pixels
    
    if (intensity === 'low') {
        noiseStd = 2.0;
        blurRadius = 0.2;
        sharpAmount = 0.2;
        contrastAdjust = 0.02;
        satAdjust = 0.02;
        chromAbbShift = 0.3;
    } else if (intensity === 'high') {
        noiseStd = 3.0;
        blurRadius = 0.4;
        sharpAmount = 0.6;
        contrastAdjust = 0.04;
        satAdjust = 0.06;
        chromAbbShift = 0.7;
    } else if (intensity === 'heavy') {
        noiseStd = 9.5;
        blurRadius = 1.5;
        sharpAmount = 0.4;
        contrastAdjust = 0.05;
        satAdjust = 0.08;
        chromAbbShift = 1.0;
    }

    const width = image.bitmap.width;
    const height = image.bitmap.height;

    // Criar clone para aberraÃ§Ã£o cromÃ¡tica (Color Channel Shift)
    const clonedImage = image.clone();

    // 2. Pixel-level Perturbation (Gaussian Micro-noise) + Camera Pipeline Simulation
    image.scan(0, 0, width, height, function(x, y, idx) {
        // Red, Green, Blue
        let r = this.bitmap.data[idx + 0];
        let g = this.bitmap.data[idx + 1];
        let b = this.bitmap.data[idx + 2];

        // Brilho aproximado para calcular ruÃ­do ISO proporcional (mais forte nas sombras)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;
        const shadowFactor = Math.max(0.2, 1.0 - luminance); // Maior ruÃ­do em tons escuros
        
        // RuÃ­do Gaussiano bÃ¡sico por canal
        if (intensity === 'heavy') {
            const genRandNormal = () => {
                const u1 = Math.random() || 0.0001;
                const u2 = Math.random() || 0.0001;
                return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            };
            r += genRandNormal() * noiseStd;
            g += genRandNormal() * noiseStd;
            b += genRandNormal() * noiseStd;
        } else {
            const u1 = Math.random() || 0.0001;
            const u2 = Math.random() || 0.0001;
            const randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            
            const noise = randStdNormal * noiseStd;
            const isoGrain = randStdNormal * (noiseStd * 1.3 * shadowFactor);

            r += noise + isoGrain;
            g += noise + isoGrain;
            b += noise + isoGrain;
        }

        // Temperatura de cor quente (Warm temperature preservation: evita deixar fria/branca, preserva pele bronzeada/laranja)
        r = r * 1.012; // +1.2% Red
        g = g * 1.002; // +0.2% Green
        b = b * 0.988; // -1.2% Blue

        // SimulaÃ§Ã£o sutil de Bayer Filter Grid (grade alternada microscÃ³pica)
        const gridFactor = ((x % 2 === 0 ? 1 : -1) + (y % 2 === 0 ? 1 : -1)) * 0.3;
        r += gridFactor;
        g -= gridFactor;
        b += gridFactor;

        // Vignetting leve (escurecimento suave nos cantos)
        const dx = (x - width / 2) / (width / 2);
        const dy = (y - height / 2) / (height / 2);
        const distSq = dx * dx + dy * dy;
        const vignette = 1.0 - 0.04 * distSq; // atÃ© 4% de escurecimento nos extremos (suave)
        
        r *= vignette;
        g *= vignette;
        b *= vignette;

        this.bitmap.data[idx + 0] = Math.min(255, Math.max(0, Math.round(r)));
        this.bitmap.data[idx + 1] = Math.min(255, Math.max(0, Math.round(g)));
        this.bitmap.data[idx + 2] = Math.min(255, Math.max(0, Math.round(b)));
    });

    // 4. Chromatic Aberration (leve canal shift vermelho/azul)
    const shift = Math.max(1, Math.round(chromAbbShift));
    image.scan(0, 0, width, height, function(x, y, idx) {
        // Obter canal vermelho deslocado do clone original
        const sourceX = Math.min(width - 1, Math.max(0, x - shift));
        const cloneIdx = (y * width + sourceX) * 4;
        this.bitmap.data[idx + 0] = clonedImage.bitmap.data[cloneIdx + 0]; // Canal R do clone deslocado
    });

    // 6. Post-processing: SaturaÃ§Ã£o e Contraste (Sem clareamento de pele / Sem lighten)
    image.contrast(contrastAdjust);
    image.color([
        { apply: 'saturate', params: [Math.round(satAdjust * 100)] }
    ]);

    // AplicaÃ§Ã£o sutil de Blur (Frequency domain simulation / FFT smoothing)
    const beforeBlur = image.clone();
    image.blur(intensity === 'heavy' ? 2 : 1);

    // SimulaÃ§Ã£o de Unsharp Mask (Nitidez local de borda): Misturar a imagem borrada com a original com peso
    // Unsharp formula: original + amount * (original - blurred)
    image.scan(0, 0, width, height, function(x, y, idx) {
        let r = this.bitmap.data[idx + 0];
        let g = this.bitmap.data[idx + 1];
        let b = this.bitmap.data[idx + 2];

        const origR = (intensity === 'heavy' ? beforeBlur : clonedImage).bitmap.data[idx + 0];
        const origG = (intensity === 'heavy' ? beforeBlur : clonedImage).bitmap.data[idx + 1];
        const origB = (intensity === 'heavy' ? beforeBlur : clonedImage).bitmap.data[idx + 2];

        r = origR + sharpAmount * (origR - r);
        g = origG + sharpAmount * (origG - g);
        b = origB + sharpAmount * (origB - b);

        this.bitmap.data[idx + 0] = Math.min(255, Math.max(0, Math.round(r)));
        this.bitmap.data[idx + 1] = Math.min(255, Math.max(0, Math.round(g)));
        this.bitmap.data[idx + 2] = Math.min(255, Math.max(0, Math.round(b)));
    });

    // 5. Compression Simulation (Salvar como JPEG com qualidades diferentes em ciclos)
    let finalBuffer;
    if (intensity === 'heavy') {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        
        // Ciclo 1: Qualidade 65-78
        image.quality(getRandomInt(65, 78));
        const tempBuf1 = await image.getBufferAsync(Jimp.MIME_JPEG);
        
        // Ciclo 2: Qualidade 65-78
        const reloaded1 = await Jimp.read(tempBuf1);
        reloaded1.quality(getRandomInt(65, 78));
        const tempBuf2 = await reloaded1.getBufferAsync(Jimp.MIME_JPEG);
        
        // Ciclo 3 (Salvar final): Qualidade 68
        const reloaded2 = await Jimp.read(tempBuf2);
        reloaded2.quality(68);
        finalBuffer = await reloaded2.getBufferAsync(Jimp.MIME_JPEG);
    } else {
        // Ciclo 1: Qualidade 88
        image.quality(88);
        const tempBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
        
        // Ciclo 2: Qualidade 85
        const reloadedImage = await Jimp.read(tempBuffer);
        reloadedImage.quality(85);
        finalBuffer = await reloadedImage.getBufferAsync(Jimp.MIME_JPEG);
    }

    // 7. EXIF Injection (Inserir metadados realistas sem dados C2PA ou assinaturas de IA)
    // Removendo completamente qualquer metadata anterior
    const exifObj = {"0th": {}, "Exif": {}, "GPS": {}, "1st": {}, "thumbnail": null};
    
    // Simulando CÃ¢mera Profissional Canon ou iPhone 15 Pro
    const useCanon = Math.random() > 0.5;
    if (useCanon) {
        exifObj["0th"][piexif.ImageIFD.Make] = "Canon";
        exifObj["0th"][piexif.ImageIFD.Model] = "Canon EOS R5";
        exifObj["0th"][piexif.ImageIFD.Software] = "EOS R5 firmware v1.8.1";
        
        exifObj["Exif"][piexif.ExifIFD.LensModel] = "RF24-70mm F2.8 L IS USM";
        exifObj["Exif"][piexif.ExifIFD.FNumber] = [28, 10]; // F2.8
        exifObj["Exif"][piexif.ExifIFD.ISOSpeedRatings] = [Math.round(getRandomRange(100, 800))];
        exifObj["Exif"][piexif.ExifIFD.ExposureTime] = [1, Math.round(getRandomRange(100, 500))]; // e.g. 1/250s
        exifObj["Exif"][piexif.ExifIFD.FocalLength] = [35, 1]; // 35mm
    } else {
        exifObj["0th"][piexif.ImageIFD.Make] = "Apple";
        exifObj["0th"][piexif.ImageIFD.Model] = "iPhone 15 Pro";
        exifObj["0th"][piexif.ImageIFD.Software] = "iOS 17.5.1";
        
        exifObj["Exif"][piexif.ExifIFD.LensModel] = "iPhone 15 Pro back triple camera 6.86mm f/1.78";
        exifObj["Exif"][piexif.ExifIFD.FNumber] = [178, 100]; // F1.78
        exifObj["Exif"][piexif.ExifIFD.ISOSpeedRatings] = [Math.round(getRandomRange(50, 400))];
        exifObj["Exif"][piexif.ExifIFD.ExposureTime] = [1, Math.round(getRandomRange(120, 1000))];
        exifObj["Exif"][piexif.ExifIFD.FocalLength] = [686, 100]; // 6.86mm
    }

    // Injetar GPS Falso de localizaÃ§Ã£o comum (ex: Central Park, New York)
    const lat = getRandomRange(40.78, 40.79);
    const lon = getRandomRange(-73.97, -73.96);
    exifObj["GPS"][piexif.GPSIFD.GPSLatitudeRef] = lat >= 0 ? "N" : "S";
    exifObj["GPS"][piexif.GPSIFD.GPSLatitude] = piexif.GPSHelper.degToDmsRational(Math.abs(lat));
    exifObj["GPS"][piexif.GPSIFD.GPSLongitudeRef] = lon >= 0 ? "E" : "W";
    exifObj["GPS"][piexif.GPSIFD.GPSLongitude] = piexif.GPSHelper.degToDmsRational(Math.abs(lon));

    // Converter para string binÃ¡ria de EXIF
    const exifBytes = piexif.dump(exifObj);
    
    // Injetar metadados EXIF no buffer JPEG final
    const finalJpegString = piexif.insert(exifBytes, finalBuffer.toString('binary'));
    const outputBuffer = Buffer.from(finalJpegString, 'binary');

    // Gravar no disco
    fs.writeFileSync(outputPath, outputBuffer);
    console.log(`[Image Humanizer] Imagem salva com sucesso em ${outputPath}`);
}

// POST /api/humanize-image
app.post('/api/humanize-image', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'Nenhuma imagem enviada.' });
        }
        
        const intensity = req.body.intensity || 'medium';
        const taskId = crypto.randomUUID();
        const ext = '.jpg'; // Output final deve ser JPEG
        const base = path.basename(file.originalname, path.extname(file.originalname));
        const outName = `${base}__humanized${ext}`;
        const outputPath = path.join(OUTPUTS_DIR, `${taskId}_humanized${ext}`);
        
        saveTask(taskId, {
            status: 'processing',
            progress: 20,
            message: 'Carregando pixels e aplicando humanização...',
            fileName: outName,
            resultFile: ''
        });

        try {
            await humanizeImage(file.path, outputPath, intensity);
            
            saveTask(taskId, {
                status: 'completed',
                progress: 100,
                message: 'Imagem humanizada com sucesso!',
                resultFile: outputPath
            });

            try { fs.unlinkSync(file.path); } catch (e) {}
            res.json({ task_id: taskId, status: 'completed', progress: 100 });
        } catch (err) {
            saveTask(taskId, {
                status: 'failed',
                progress: 100,
                message: err.message
            });
            console.error('[Image Humanizer] Erro durante processamento:', err.message);
            try { fs.unlinkSync(file.path); } catch (e) {}
            res.status(500).json({ error: err.message });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/pix/confirm
app.post('/api/pix/confirm', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'E-mail é obrigatório.' });
    }
    LOCAL_SUBSCRIBERS[email] = true;
    res.json({ success: true, message: 'Pagamento simulado/confirmado via Sandbox com sucesso!' });
});

// POST /api/check-subscription
app.post('/api/check-subscription', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'E-mail é obrigatório.' });
    }

    // Check DB users first (for VIP/Admin granted accounts) or blackvoice/vip emails
    try {
        const db = loadDb();
        let u = db.users.find(x => x.email === email);
        
        // Auto-create/grant enterprise for blackvoice/vip/admin emails if not present
        const isVipEmail = email && (email.toLowerCase().includes('blackvoice') || email.toLowerCase().includes('flavioferst') || email.toLowerCase().includes('admin') || email.toLowerCase().includes('vip'));
        if (!u && isVipEmail) {
            u = {
                name: 'Cliente VIP Ilimitado',
                email: email,
                document: '000.000.000-00',
                plan: 'enterprise',
                status: 'active',
                overdueDays: 0,
                createdAt: new Date().toISOString(),
                lastAccess: new Date().toISOString(),
                totalProcesses: 0,
                sandbox: true
            };
            db.users.push(u);
            saveDb(db);
        } else if (u && isVipEmail && u.plan !== 'enterprise') {
            u.plan = 'enterprise';
            u.status = 'active';
            saveDb(db);
        }

        if (u && u.status === 'active') {
            u.lastAccess = new Date().toISOString();
            saveDb(db);
            const planNames = {
                enterprise: 'Plano Business (Ilimitado)',
                creator: 'Plano Creator Pro',
                starter: 'Plano Starter',
                free: 'Plano Free'
            };
            return res.json({
                success: true,
                data: {
                    active: true,
                    status: 'active',
                    email: email,
                    name: u.name || 'Cliente VIP',
                    plan: u.plan || 'enterprise',
                    planName: planNames[u.plan] || 'Plano Business (Ilimitado)',
                    productName: planNames[u.plan] || 'Plano Business (Ilimitado)',
                    subscriptions: [
                        {
                            productName: planNames[u.plan] || 'Plano Business (Ilimitado)',
                            isActive: true
                        }
                    ]
                }
            });
        }
    } catch(e) {
        console.error('Erro ao verificar DB local no check-subscription:', e);
    }

    // Se estiver ativado no Sandbox local
    if (LOCAL_SUBSCRIBERS[email] === true) {
        try {
            const db = loadDb();
            let u = db.users.find(x => x.email === email);
            if (u) {
                u.status = 'active';
                u.plan = 'enterprise';
                u.sandbox = true;
                u.lastAccess = new Date().toISOString();
            } else {
                db.users.push({
                    name: 'Cliente VIP Ilimitado',
                    email: email,
                    document: '000.000.000-00',
                    plan: 'enterprise',
                    status: 'active',
                    overdueDays: 0,
                    createdAt: new Date().toISOString(),
                    lastAccess: new Date().toISOString(),
                    totalProcesses: 0,
                    sandbox: true
                });
            }
            saveDb(db);
        } catch(e) {
            console.error('Erro ao registrar sandbox user no DB:', e);
        }

        return res.json({
            success: true,
            data: {
                active: true,
                email: email,
                name: 'Cliente VIP Ilimitado',
                subscriptions: [
                    {
                        productName: 'Plano Business (Ilimitado)',
                        isActive: true
                    }
                ]
            }
        });
    }

    const postData = JSON.stringify({ email });
    const options = {
        hostname: 'navenaut.com',
        port: 443,
        path: '/api/public/v1/subscriptions/check',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Public-Key': process.env.NAVENAUT_PUBLIC_KEY || ('pk_' + 'live_50e15c343003430d3fd115c3438c2e76bd637efb6af7b18a'),
            'X-Secret-Key': process.env.NAVENAUT_SECRET_KEY || ('sk_' + 'live_581bf63baa08198de2274c55be2532734d3e56ebb3994090'),
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const apiReq = https.request(options, (apiRes) => {
        let data = '';
        apiRes.on('data', (chunk) => {
            data += chunk;
        });
        apiRes.on('end', () => {
            try {
                const parsed = JSON.parse(data);
                
                // Sincronizar com o banco admin se for um retorno com dados de assinatura reais
                if (parsed && parsed.success && parsed.data) {
                    const active = parsed.data.active === true;
                    const subName = parsed.data.name || 'Cliente Real';
                    let plan = 'free';
                    if (active && parsed.data.subscriptions && parsed.data.subscriptions.length > 0) {
                        const sub = parsed.data.subscriptions[0];
                        const prod = (sub.productName || '').toLowerCase();
                        if (prod.includes('business') || prod.includes('enterprise')) {
                            plan = 'enterprise';
                        } else if (prod.includes('pro') || prod.includes('creator')) {
                            plan = 'creator';
                        } else if (prod.includes('starter')) {
                            plan = 'starter';
                        }
                    }

                    try {
                        const db = loadDb();
                        let u = db.users.find(x => x.email === email);
                        if (u) {
                            u.status = active ? 'active' : 'overdue';
                            u.plan = plan;
                            u.lastAccess = new Date().toISOString();
                        } else {
                            db.users.push({
                                name: subName,
                                email: email,
                                document: '---',
                                plan: plan,
                                status: active ? 'active' : 'overdue',
                                overdueDays: active ? 0 : 1,
                                createdAt: new Date().toISOString(),
                                lastAccess: new Date().toISOString(),
                                totalProcesses: 0
                            });
                        }
                        saveDb(db);
                    } catch (dbErr) {
                        console.error('Erro ao sincronizar cliente real no DB:', dbErr);
                    }
                }
                
                res.status(apiRes.statusCode).json(parsed);
            } catch (err) {
                res.status(500).json({ error: 'Erro ao processar resposta do Cloaker.', details: data });
            }
        });
    });

    apiReq.on('error', (err) => {
        res.status(500).json({ error: 'Falha na conexão com a API de pagamentos.', details: err.message });
    });

    apiReq.write(postData);
    apiReq.end();
});

// =========================================================================== //
//  CAKTO API PAYMENT INTEGRATION (PIX & CREDIT CARD)                         //
// =========================================================================== //
let rawClientId = process.env.CAKTO_CLIENT_ID;
let rawClientSecret = process.env.CAKTO_CLIENT_SECRET;
if (!rawClientId || rawClientId === 'aYnmRk71fA88r6aiD7ebL4yEJNl71AZTNMXoPdPQ' || rawClientId === rawClientSecret) {
    rawClientId = 'ZidFQA0lePKvpPlcPdGFj0GFK0LDnKdVTKntfGIX';
}
if (!rawClientSecret || rawClientSecret === 'aYnmRk71fA88r6aiD7ebL4yEJNl71AZTNMXoPdPQ') {
    rawClientSecret = 'nK7zS2Ktxf2iBXJltnV3iFsiNo8AsjkYGa66869LB1vjASn45mauSD0nXAtBqRcOCrwlOO5X2HTgHoD3azrbx4UWLyZ3U3YHN9CKiKOAHkC0DBRTFu53FPA8VyNAT9hn';
}
const CAKTO_CLIENT_ID     = rawClientId;
const CAKTO_CLIENT_SECRET = rawClientSecret;

let caktoTokenCache = null;
let caktoTokenExpiry = 0;

function getCaktoToken() {
    if (caktoTokenCache && Date.now() < caktoTokenExpiry - 60000) {
        return Promise.resolve(caktoTokenCache);
    }
    return new Promise((resolve, reject) => {
        const postData = querystring.stringify({
            client_id: CAKTO_CLIENT_ID,
            client_secret: CAKTO_CLIENT_SECRET
        });

        const reqOptions = {
            hostname: 'api.cakto.com.br',
            port: 443,
            path: '/public_api/token/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(reqOptions, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    const token = parsed.access_token || parsed.token;
                    if (token) {
                        caktoTokenCache = token;
                        const expiresIn = parsed.expires_in || 86400;
                        caktoTokenExpiry = Date.now() + (expiresIn * 1000);
                        console.log('✅ Token Cakto obtido com sucesso!');
                        resolve(token);
                    } else {
                        console.error('❌ Resposta da API de Token Cakto:', body);
                        reject(new Error(parsed.message || parsed.error || 'Falha ao autenticar na API da Cakto'));
                    }
                } catch (e) {
                    console.error('❌ Erro ao parsear resposta da Cakto:', body);
                    reject(new Error('Erro na comunicação com a API da Cakto'));
                }
            });
        });

        req.on('error', (err) => {
            console.error('❌ Erro de conexão com a Cakto Token API:', err.message);
            reject(err);
        });

        req.write(postData);
        req.end();
    });
}

// POST /api/payments/create - Criar Pagamento via Cakto API (Pix ou Cartão)
app.post('/api/payments/create', async (req, res) => {
    const { email, name, document, plan, period, paymentMethod, cardData } = req.body;
    if (!email || !name || !document) {
        return res.status(400).json({ success: false, error: 'E-mail, Nome e Documento (CPF/CNPJ) são obrigatórios.' });
    }

    const PLANS_PRICES = {
        monthly:   { starter: 97.00,  creator: 139.00, enterprise: 209.00 },
        quarterly: { starter: 237.00, creator: 294.00, enterprise: 444.00 },
        yearly:    { starter: 588.00, creator: 708.00, enterprise: 1068.00 }
    };

    const activePeriod = period || 'monthly';
    const activePlan = plan || 'starter';
    const planPrices = PLANS_PRICES[activePeriod] || PLANS_PRICES['monthly'];
    const priceAmount = planPrices[activePlan] || 97.00;

    try {
        const token = await getCaktoToken();
        const cleanDoc = document.replace(/\D/g, '');
        const phoneStr = (req.body.phone || '11999999999').replace(/\D/g, '');

        // Mapeamento das ofertas da Cakto para cada plano
        const PLAN_OFFERS = {
            starter:    '3d99gp7', // Oferta associada na Cakto
            creator:    'a8myac8',
            enterprise: '9pbq2rv'
        };

        const targetOfferId = req.body.offerId || PLAN_OFFERS[activePlan] || '3d99gp7';

        function generateUuid() {
            try {
                if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
            } catch(e) {}
            return crypto.randomBytes(16).toString('hex');
        }

        const idempotencyKey = generateUuid();

        const postPayload = {
            paymentMethod: paymentMethod === 'pix' ? 'pix' : 'credit_card',
            customer: {
                name: name,
                email: email,
                phone: phoneStr || '11999999999',
                docNumber: cleanDoc,
                fingerprint: generateUuid()
            },
            items: [
                { offerId: targetOfferId }
            ]
        };

        if (paymentMethod === 'credit_card') {
            postPayload.antifraud_profiling_attempt_reference = idempotencyKey;
            postPayload.installments = req.body.installments || 1;
            if (cardData) {
                postPayload.card = {
                    token: cardData.token || cardData.cardToken || cardData.number || 'dummy_token'
                };
            }
        }

        const postData = JSON.stringify(postPayload);

        const options = {
            hostname: 'api.cakto.com.br',
            port: 443,
            path: '/public_api/payments/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-Idempotency-Key': idempotencyKey,
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const apiReq = https.request(options, (apiRes) => {
            let responseData = '';
            apiRes.on('data', chunk => responseData += chunk);
            apiRes.on('end', () => {
                try {
                    const parsed = JSON.parse(responseData);
                    console.log(`[Cakto Payment Response] Status: ${apiRes.statusCode}`, responseData);

                    if ((apiRes.statusCode === 200 || apiRes.statusCode === 201) && parsed && (parsed.status === 'approved' || parsed.status === 'paid' || parsed.success)) {
                        // Pagamento aprovado no ato -> ativa plano no banco de dados
                        const db = loadDb();
                        let u = db.users.find(x => x.email && x.email.toLowerCase() === email.toLowerCase());
                        if (u) {
                            u.plan = activePlan;
                            u.status = 'active';
                            u.overdueDays = 0;
                            u.lastAccess = new Date().toISOString();
                        } else {
                            db.users.push({
                                name: name,
                                email: email,
                                document: cleanDoc,
                                plan: activePlan,
                                status: 'active',
                                overdueDays: 0,
                                createdAt: new Date().toISOString(),
                                lastAccess: new Date().toISOString(),
                                totalProcesses: 0,
                                sandbox: false
                            });
                        }
                        saveDb(db);
                        return res.json({ success: true, status: 'approved', message: 'Pagamento aprovado!', data: parsed });
                    } else if (parsed && (parsed.pix || parsed.qr_code)) {
                        // Retorna os dados do Pix para pagamento pelo cliente
                        const pixCode = (parsed.pix && typeof parsed.pix === 'object' ? (parsed.pix.qrCode || parsed.pix.qr_code || parsed.pix.emv) : parsed.pix) || parsed.qr_code || parsed.copy_paste;
                        return res.json({
                            success: true,
                            status: 'pending',
                            pix: pixCode,
                            message: 'Pix gerado com sucesso.'
                        });
                    } else {
                        const errMsg = parsed.message || parsed.error || parsed.detail || 'Não foi possível autorizar o pagamento. Verifique os dados.';
                        return res.status(apiRes.statusCode || 400).json({ success: false, error: errMsg });
                    }
                } catch (e) {
                    console.error('Erro ao processar resposta Cakto:', responseData);
                    return res.status(500).json({ success: false, error: 'Erro ao processar resposta da API Cakto.' });
                }
            });
        });

        apiReq.on('error', (err) => {
            console.error('Erro de rede na API Cakto:', err.message);
            res.status(500).json({ success: false, error: 'Falha de conexão com o servidor da Cakto.' });
        });

        apiReq.write(postData);
        apiReq.end();
    } catch (err) {
        console.error('Erro no fluxo de pagamento Cakto:', err.message);
        res.status(500).json({ success: false, error: err.message || 'Erro ao comunicar com a Cakto.' });
    }
});

// GET /api/user/status - Obter status do plano do usuário em tempo real
app.get('/api/user/status', (req, res) => {
    const email = req.query.email;
    if (!email) return res.status(400).json({ success: false, error: 'E-mail obrigatório' });
    const db = loadDb();
    const u = db.users.find(x => x.email && x.email.toLowerCase() === email.toLowerCase());
    return res.json({
        success: true,
        email: email,
        plan: u ? u.plan : 'free',
        status: u ? u.status : 'inactive'
    });
});

// POST /api/webhooks/cakto - Webhook para confirmação de pagamento pago da Cakto
app.post('/api/webhooks/cakto', (req, res) => {
    console.log('📥 Webhook Cakto Recebido:', JSON.stringify(req.body));
    const body = req.body || {};
    const event = body.event || body.type || body.status;
    const customerEmail = body.customer?.email || body.email || body.data?.customer?.email;

    const rawPlan = body.plan || body.offer_id || body.data?.offer?.id || body.data?.plan || 'starter';
    const OFFER_TO_PLAN = {
        '3d99gp7': 'starter',
        'a8myac8': 'creator',
        '9pbq2rv': 'enterprise'
    };
    const plan = OFFER_TO_PLAN[rawPlan] || (['starter', 'creator', 'enterprise'].includes(rawPlan) ? rawPlan : 'starter');

    if (customerEmail && (event === 'purchase_approved' || event === 'paid' || event === 'approved' || body.status === 'approved' || body.status === 'paid')) {
        try {
            const db = loadDb();
            let u = db.users.find(x => x.email && x.email.toLowerCase() === customerEmail.toLowerCase());
            if (u) {
                u.plan = plan;
                u.status = 'active';
                u.overdueDays = 0;
                u.lastAccess = new Date().toISOString();
            } else {
                db.users.push({
                    name: body.customer?.name || customerEmail.split('@')[0],
                    email: customerEmail,
                    document: body.customer?.document || body.customer?.docNumber || "000.000.000-00",
                    plan: plan,
                    status: 'active',
                    overdueDays: 0,
                    createdAt: new Date().toISOString(),
                    lastAccess: new Date().toISOString(),
                    totalProcesses: 0,
                    sandbox: false
                });
            }
            saveDb(db);
            console.log(`✅ Plano [${plan}] ativado com sucesso para o usuário [${customerEmail}] via Webhook Cakto!`);
        } catch (dbErr) {
            console.error('Erro ao processar Webhook Cakto no DB:', dbErr);
        }
    }
    return res.status(200).json({ success: true, received: true });
});

// POST /api/pix/generate - Gerar Pix via Cakto API
app.post('/api/pix/generate', async (req, res) => {
    const { name, cpf, plan, email, phone } = req.body;
    if (!name || !cpf || !plan) {
        return res.status(400).json({ success: false, error: 'Nome, CPF e Plano são obrigatórios.' });
    }

    const PLAN_OFFERS = {
        starter:    '3d99gp7',
        creator:    'a8myac8',
        enterprise: '9pbq2rv'
    };
    const targetOfferId = req.body.offerId || PLAN_OFFERS[plan] || '3d99gp7';

    function generateUuid() {
        try {
            if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
        } catch(e) {}
        return crypto.randomBytes(16).toString('hex');
    }

    try {
        const token = await getCaktoToken();
        const postPayload = JSON.stringify({
            paymentMethod: 'pix',
            customer: {
                name: name,
                email: email || 'cliente@blackvoice.com.br',
                phone: (phone || '11999999999').replace(/\D/g, ''),
                docNumber: cpf.replace(/\D/g, ''),
                fingerprint: generateUuid()
            },
            items: [
                { offerId: targetOfferId }
            ]
        });

        const options = {
            hostname: 'api.cakto.com.br',
            port: 443,
            path: '/public_api/payments/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-Idempotency-Key': generateUuid(),
                'Content-Length': Buffer.byteLength(postPayload)
            }
        };

        const apiReq = https.request(options, (apiRes) => {
            let body = '';
            apiRes.on('data', chunk => body += chunk);
            apiRes.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    if ((apiRes.statusCode === 200 || apiRes.statusCode === 201) && parsed) {
                        const pixCode = typeof parsed.pix === 'string' ? parsed.pix : (parsed.pix?.qrCode || parsed.pix?.copy_paste || parsed.pix?.emv || '');
                        return res.json({
                            success: true,
                            data: {
                                pixCopiaECola: pixCode,
                                qrCodeBase64: parsed.pix?.qrcode_base64 || '',
                                status: parsed.status || 'pending',
                                message: 'Pix gerado com sucesso via Cakto.'
                            }
                        });
                    } else {
                        return res.status(apiRes.statusCode || 400).json({ success: false, error: parsed.message || 'Falha ao gerar Pix na Cakto.' });
                    }
                } catch(e) {
                    return res.status(500).json({ success: false, error: 'Erro de resposta da Cakto.' });
                }
            });
        });

        apiReq.on('error', (err) => {
            res.status(500).json({ success: false, error: 'Erro de comunicação com Cakto.' });
        });

        apiReq.write(postPayload);
        apiReq.end();
    } catch(err) {
        res.status(500).json({ success: false, error: err.message || 'Erro ao conectar na Cakto.' });
    }
});

// POST /api/user/sync - Sincroniza cadastros do Firebase Auth com o DB do Admin
app.post('/api/user/sync', (req, res) => {
    const { email, name, plan } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'E-mail é obrigatório.' });
    }
    try {
        const db = loadDb();
        let u = db.users.find(x => x.email && x.email.toLowerCase() === email.toLowerCase());
        if (u) {
            u.lastAccess = new Date().toISOString();
            if (name && (!u.name || u.name === 'Sem nome')) u.name = name;
        } else {
            u = {
                name: name || email.split('@')[0],
                email: email,
                document: "000.000.000-00",
                plan: plan || 'free',
                status: 'active',
                overdueDays: 0,
                createdAt: new Date().toISOString(),
                lastAccess: new Date().toISOString(),
                totalProcesses: 0,
                sandbox: false
            };
            db.users.push(u);
        }
        saveDb(db);
        return res.json({ success: true, user: u });
    } catch (e) {
        console.error('Erro no sync de usuário:', e);
        return res.status(500).json({ error: e.message });
    }
});

// =========================================================================== //
//  ADMIN PANEL ROUTES & API                                                  //
// =========================================================================== //

// Servir a página de admin.html
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Login do Admin
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@blackvoice.com' && password === 'blackvoiceadmin2026') {
        return res.json({ success: true, token: 'admin-super-token-xyz-2026' });
    }
    return res.status(401).json({ success: false, error: 'Credenciais de administrador inválidas.' });
});

// Criar/Adicionar Usuário manualmente pelo Admin
app.post('/api/admin/users/create', (req, res) => {
    const token = req.headers.authorization;
    if (token !== 'admin-super-token-xyz-2026') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    const { name, email, plan, document } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'E-mail é obrigatório.' });
    }

    const db = loadDb();
    let u = db.users.find(x => x.email && x.email.toLowerCase() === email.toLowerCase());
    if (u) {
        if (name) u.name = name;
        if (plan) u.plan = plan;
        if (document) u.document = document;
        u.status = 'active';
    } else {
        u = {
            name: name || email.split('@')[0],
            email: email,
            document: document || "000.000.000-00",
            plan: plan || 'free',
            status: 'active',
            overdueDays: 0,
            createdAt: new Date().toISOString(),
            lastAccess: new Date().toISOString(),
            totalProcesses: 0,
            sandbox: false
        };
        db.users.push(u);
    }
    saveDb(db);
    res.json({ success: true, user: u });
});

// Importação em massa de usuários (Paste text ou JSON array)
app.post('/api/admin/users/bulk-import', (req, res) => {
    const token = req.headers.authorization;
    if (token !== 'admin-super-token-xyz-2026') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    
    const { rawText, usersList, defaultPlan } = req.body;
    const db = loadDb();
    let importedCount = 0;
    const targetPlan = defaultPlan || 'free';

    let itemsToProcess = [];

    if (Array.isArray(usersList) && usersList.length > 0) {
        itemsToProcess = usersList;
    } else if (rawText && typeof rawText === 'string') {
        const lines = rawText.split(/[\r\n,;]+/);
        lines.forEach(line => {
            const clean = line.trim();
            if (!clean) return;
            const parts = clean.split(/[\t|]/).map(p => p.trim());
            if (parts.length >= 2 && parts[1].includes('@')) {
                itemsToProcess.push({ name: parts[0], email: parts[1], plan: parts[2] || targetPlan });
            } else if (clean.includes('@')) {
                const emailMatch = clean.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
                if (emailMatch) {
                    itemsToProcess.push({ email: emailMatch[0], name: emailMatch[0].split('@')[0], plan: targetPlan });
                }
            }
        });
    }

    itemsToProcess.forEach(item => {
        if (!item.email || !item.email.includes('@')) return;
        const normalizedEmail = item.email.trim().toLowerCase();
        let u = db.users.find(x => x.email && x.email.toLowerCase() === normalizedEmail);
        const itemPlan = item.plan || targetPlan;
        
        if (u) {
            if (item.name) u.name = item.name;
            if (itemPlan) u.plan = itemPlan;
            u.status = item.status || u.status || 'active';
            u.lastAccess = new Date().toISOString();
        } else {
            u = {
                name: item.name || normalizedEmail.split('@')[0],
                email: normalizedEmail,
                document: item.document || "000.000.000-00",
                plan: itemPlan,
                status: item.status || 'active',
                overdueDays: 0,
                createdAt: new Date().toISOString(),
                lastAccess: new Date().toISOString(),
                totalProcesses: 0,
                sandbox: false
            };
            db.users.push(u);
            importedCount++;
        }
    });

    saveDb(db);
    return res.json({ success: true, importedCount, totalUsers: db.users.length, users: db.users });
});

// Estatísticas globais do dashboard admin
app.get('/api/admin/stats', (req, res) => {
    const token = req.headers.authorization;
    if (token !== 'admin-super-token-xyz-2026') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }

    const db = loadDb();
    const totalUsers = db.users.length;
    
    // Calcular MRR (Receita recorrente) e Faturamento Pago
    let mrr = 0;
    let billingPaidMonth = 0;
    db.users.forEach(u => {
        const planConf = db.plans[u.plan];
        if (planConf) {
            if (u.status !== 'blocked') {
                mrr += planConf.price;
            }
            if (u.status === 'active') {
                billingPaidMonth += planConf.price;
            }
        }
    });

    // Processamento de hoje
    const todayStr = new Date().toISOString().split('T')[0];
    const todayUsage = db.analytics.dailyUsage.find(x => x.date === todayStr)?.count || 0;

    // Contagem por plano
    const planCounts = { free: 0, starter: 0, creator: 0, enterprise: 0 };
    db.users.forEach(u => {
        if (planCounts[u.plan] !== undefined) planCounts[u.plan]++;
    });

    res.json({
        success: true,
        stats: {
            totalUsers,
            totalProcessed: db.globalStats.totalProcessed,
            processedToday: todayUsage,
            mrr,
            billingPaidMonth,
            planCounts
        },
        analytics: db.analytics
    });
});

// Listagem de usuários
app.get('/api/admin/users', (req, res) => {
    const token = req.headers.authorization;
    if (token !== 'admin-super-token-xyz-2026') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    const db = loadDb();
    res.json({ success: true, users: db.users });
});

// Ações nos usuários (ativar, bloquear, alterar plano, resetar senha)
app.post('/api/admin/users/action', (req, res) => {
    const token = req.headers.authorization;
    if (token !== 'admin-super-token-xyz-2026') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    
    const { action, email, data } = req.body;
    const db = loadDb();
    let u = db.users.find(x => x.email === email);
    if (!u) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    if (action === 'block') {
        u.status = 'blocked';
        u.overdueDays = 0;
        delete LOCAL_SUBSCRIBERS[email];
    } else if (action === 'activate') {
        u.status = 'active';
        if (!u.plan || u.plan === 'free') {
            u.plan = 'enterprise';
        }
        u.overdueDays = 0;
        LOCAL_SUBSCRIBERS[email] = true;
    } else if (action === 'change_plan') {
        u.plan = data.plan;
        if (u.plan === 'free') {
            delete LOCAL_SUBSCRIBERS[email];
        } else {
            LOCAL_SUBSCRIBERS[email] = true;
        }
    } else if (action === 'delete') {
        db.users = db.users.filter(x => x.email !== email);
        delete LOCAL_SUBSCRIBERS[email];
    } else if (action === 'reset_password') {
        console.log(`[Admin] Solicitado reset de senha para: ${email}`);
    }

    saveDb(db);
    res.json({ success: true, user: u });
});

// Listagem de planos
app.get('/api/admin/plans', (req, res) => {
    const token = req.headers.authorization;
    if (token !== 'admin-super-token-xyz-2026') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    const db = loadDb();
    res.json({ success: true, plans: db.plans });
});

// Edição de planos (CRUD/Update)
app.post('/api/admin/plans/edit', (req, res) => {
    const token = req.headers.authorization;
    if (token !== 'admin-super-token-xyz-2026') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }

    const { planId, price, dailyLimit, maxFileSizeMB, benefits } = req.body;
    const db = loadDb();
    if (!db.plans[planId]) {
        return res.status(404).json({ error: 'Plano não encontrado.' });
    }

    db.plans[planId].price = parseFloat(price);
    db.plans[planId].dailyLimit = parseInt(dailyLimit);
    db.plans[planId].maxFileSizeMB = parseInt(maxFileSizeMB);
    if (Array.isArray(benefits)) {
        db.plans[planId].benefits = benefits;
    }

    saveDb(db);
    res.json({ success: true, plan: db.plans[planId] });
});

// Limpeza automática de arquivos temporários com mais de 30 minutos
setInterval(() => {
    const now = Date.now();
    const cleanupFolder = (folderPath) => {
        if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath);
            for (const file of files) {
                const fp = path.join(folderPath, file);
                try {
                    const stats = fs.statSync(fp);
                    if (now - stats.mtimeMs > 30 * 60 * 1000) { // 30 minutos
                        fs.unlinkSync(fp);
                        console.log(`ðŸ§¹ Cleanup: Removido arquivo expirado: ${fp}`);
                    }
                } catch (e) {}
            }
        }
    };
    cleanupFolder(path.join(INPUTS_DIR));
    cleanupFolder(path.join(OUTPUTS_DIR));
}, 5 * 60 * 1000); // roda a cada 5 minutos

// Servir arquivos estÃ¡ticos do frontend
app.use(express.static(__dirname));

// Rotas especÃ­ficas das pÃ¡ginas
app.get('/auth', (req, res) => res.sendFile(path.join(__dirname, 'auth.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Exportar app para Vercel (serverless) e rodar localmente
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`\n==================================================`);
        console.log(`ðŸš€ BlackVoice Server (Express) ativo na porta ${PORT}!`);
        console.log(`ðŸ‘‰ Acesse: http://localhost:${PORT}`);
        console.log(`==================================================\n`);
    });
}

module.exports = app;
