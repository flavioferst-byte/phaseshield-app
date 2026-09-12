const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\app.js', 'utf8');
const lines = content.split('\n');

console.log("Linhas com 'price' ou 'Plano' ou 'checkout' no app.js:");
lines.forEach((line, index) => {
    if (line.includes('price') || line.includes('R$') || line.includes('Plan') || line.includes('checkout')) {
        console.log(`${index + 1}: ${line.trim()}`);
    }
});
