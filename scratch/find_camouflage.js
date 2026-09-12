const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\index.html', 'utf8');
const lines = content.split('\n');

console.log("Linhas contendo 'opacity' ou 'camuflagem' ou 'imagem' no painel de upload:");
lines.forEach((line, index) => {
    if (line.includes('opacity') || line.includes('opacidade') || line.includes('image-upload') || line.includes('Camuflagem') || line.includes('camuflagem')) {
        console.log(`${index + 1}: ${line.trim()}`);
    }
});
