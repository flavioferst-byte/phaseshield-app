const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\index.html', 'utf8');
const lines = content.split('\n');

console.log("Linhas contendo 'TRANSLATIONS':");
lines.forEach((line, index) => {
    if (line.includes('TRANSLATIONS') || line.includes('pricing_desc')) {
        console.log(`${index + 1}: ${line.trim()}`);
    }
});
