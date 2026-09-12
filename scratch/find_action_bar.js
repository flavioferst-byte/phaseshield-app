const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
    if (line.includes('card-action-bar') || line.includes('btn-process')) {
        console.log(`${idx + 1}: ${line.trim()}`);
    }
});
