const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\style.css', 'utf8');
const lines = content.split('\n');

console.log("Linhas contendo 'pricing-grid':");
lines.forEach((line, index) => {
    if (line.includes('pricing-grid')) {
        console.log(`${index + 1}: ${line.trim()}`);
    }
});
