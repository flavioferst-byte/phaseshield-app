const fs = require('fs');
const content = fs.readFileSync('style.css', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
    if (line.includes('switch-btn') || line.includes('switch_btn')) {
        console.log(`${idx + 1}: ${line}`);
    }
});
