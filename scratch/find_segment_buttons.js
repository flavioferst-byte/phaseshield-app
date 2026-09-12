const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
for (let i = 460; i < 580; i++) {
    if (lines[i].includes('<button') || lines[i].includes('id=')) {
        console.log(`${i + 1}: ${lines[i].trim()}`);
    }
}
