const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('dashboard.html', 'utf8');
const regex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;

while ((match = regex.exec(html)) !== null) {
    count++;
    const fullTag = match[0];
    const code = match[1];
    const srcMatch = fullTag.match(/src=["']([^"']+)["']/);

    if (srcMatch) {
        console.log(`Script ${count}: External (${srcMatch[1]})`);
    } else {
        try {
            new vm.Script(code);
            console.log(`Script ${count}: Inline VALID (${code.length} bytes)`);
        } catch(e) {
            console.error(`Script ${count}: Inline SYNTAX ERROR ->`, e.message);
        }
    }
}
