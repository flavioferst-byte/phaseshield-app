const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const ffmpeg = 'C:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\ffmpeg.exe';
const inputPath = 'C:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\temp\\final_1fps_test.mp4';
const outputPath = 'C:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\temp\\final_1fps_test_fb_ultra.mp4';

async function processNow() {
    if (!fs.existsSync(inputPath)) {
        console.error("Erro: arquivo de entrada não existe:", inputPath);
        process.exit(1);
    }

    console.log("Iniciando processamento FB ULTRA pontual...");
    console.log("Entrada:", inputPath);
    console.log("Saída:", outputPath);

    const cr = (0.45 + Math.random()*0.02).toFixed(4);
    const cg = (0.47 + Math.random()*0.02).toFixed(4);
    const cb = (0.48 + Math.random()*0.02).toFixed(4);

    const vf = [
        `noise=c0s=18:c0f=t+u,noise=c1s=12:c1f=t+u,noise=c2s=12:c2f=t+u`,
        `eq=contrast=1.05:brightness=0.006:saturation=1.04:gamma=1.02`,
        `unsharp=luma_msize_x=5:luma_msize_y=5:luma_amount=1.50:chroma_msize_x=5:chroma_msize_y=5:chroma_amount=1.00`,
        `hqdn3d=luma_spatial=6.0:chroma_spatial=6.0:luma_tmp=8.0:chroma_tmp=8.0`,
        `curves=r='0/${cr}/0.5 1/1':g='0/${cg}/0.5 1/1':b='0/${cb}/0.5 1/1'`,
        `setpts=PTS+${(0.0005 + Math.random()*0.001).toFixed(6)}/TB`
    ].join(',');

    // Verificar áudio
    const cmdVerify = `"${ffmpeg}" -i "${inputPath}"`;
    exec(cmdVerify, (err, stdout, stderr) => {
        const output = stderr || stdout;
        const hasAudio = output.includes('Audio:');
        const audioFilter = hasAudio
            ? `-af "aecho=0.3:0.15:12:0.06,volume=1.02,asetrate=44100*1.008,aresample=44100" -c:a aac -b:a 192k -ac 2`
            : '-an';

        const cmd = `"${ffmpeg}" -y -i "${inputPath}" \
-vf "${vf}" \
-c:v libx264 -preset medium -crf 25 -pix_fmt yuv420p \
-g 250 -keyint_min 25 -sc_threshold 0 -threads 0 \
${audioFilter} \
-map_metadata -1 -map_chapters -1 \
-movflags +faststart+frag_keyframe \
-fflags +genpts \
-metadata encoding_tool="" \
"${outputPath}"`;

        console.log("Comando a ser executado:", cmd);

        exec(cmd, (err2, stdout2, stderr2) => {
            if (err2) {
                console.error("Erro na execução do FFmpeg:", stderr2 || err2.message);
                process.exit(1);
            }
            console.log("Sucesso! Vídeo gerado em:", outputPath);
            if (fs.existsSync(outputPath)) {
                console.log("Tamanho final do arquivo:", fs.statSync(outputPath).size, "bytes");
            }
        });
    });
}

processNow();
