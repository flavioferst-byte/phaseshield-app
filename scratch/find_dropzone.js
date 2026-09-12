const fs = require('fs');
const content = fs.readFileSync('style.css', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
    if (line.includes('drop-zone') || line.includes('drop_zone')) {
        console.log(`${idx + 1}: ${line}`);
    }
});
