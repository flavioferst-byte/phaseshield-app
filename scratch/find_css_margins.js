const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\style.css', 'utf8');
const lines = content.split('\n');

console.log("Linhas contendo 'layer-card' ou 'audio-bubble' ou 'layers-grid':");
lines.forEach((line, index) => {
    if (line.includes('layer-card') || line.includes('audio-bubble') || line.includes('layers-grid') || line.includes('human-bubble') || line.includes('ai-bubble')) {
        console.log(`${index + 1}: ${line.trim()}`);
    }
});
