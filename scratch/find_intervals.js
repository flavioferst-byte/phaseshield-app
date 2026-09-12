const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\app.js', 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
    if (/setTimeout|setInterval|progress|duration|delay/i.test(line)) {
        if (line.includes('process') || line.includes('Ring') || line.includes('time') || line.includes('upload')) {
            console.log(`${index + 1}: ${line.trim()}`);
        }
    }
});
