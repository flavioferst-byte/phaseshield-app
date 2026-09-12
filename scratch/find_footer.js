const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\ULTRA\\Desktop\\Phase_C\\style.css', 'utf8');
const lines = content.split('\n');

console.log("Procurando 'footer' ou 'cta-bottom' em c:\\Users\\ULTRA\\Desktop\\Phase_C\\style.css:");
lines.forEach((line, index) => {
    if (line.includes('footer') || line.includes('cta-bottom') || line.includes('cta_bottom') || line.includes('cta')) {
        console.log(`${index + 1}: ${line.trim()}`);
    }
});
