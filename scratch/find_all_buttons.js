const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
    if (line.includes('<button') && (line.includes('process') || line.includes('action') || line.includes('aplicar') || line.includes('btn-primary'))) {
        console.log(`${idx + 1}: ${line.trim()}`);
    }
});
