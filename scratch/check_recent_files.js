const fs = require('fs');
const path = require('path');

function getMostRecentVideo(dir) {
    let files = fs.readdirSync(dir);
    let videos = [];

    files.forEach(file => {
        let fp = path.join(dir, file);
        let stat = fs.statSync(fp);
        if (stat.isFile() && file.endsWith('.mp4')) {
            videos.push({
                path: fp,
                name: file,
                mtime: stat.mtime
            });
        }
    });

    if (videos.length === 0) return null;

    // Ordena decrescente pela data de modificação
    videos.sort((a, b) => b.mtime - a.mtime);
    return videos[0];
}

const recent = getMostRecentVideo('C:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\temp');
if (recent) {
    console.log(`MAIS RECENTE: ${recent.name} (${recent.path}) modificado em ${recent.mtime}`);
} else {
    console.log("Nenhum vídeo encontrado na pasta temp.");
}
