const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
    if (/Meta Ads|trusted/i.test(line)) {
        console.log(`${index + 1}: ${line.trim()}`);
    }
});
