const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\style.css', 'utf8');
const lines = content.split('\n');

console.log("Linhas contendo 'ticker-wrap' ou 'ticker-content':");
lines.forEach((line, index) => {
    if (line.includes('ticker-wrap') || line.includes('ticker-content') || line.includes('ticker')) {
        console.log(`${index + 1}: ${line.trim()}`);
    }
});
