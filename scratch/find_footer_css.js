const fs = require('fs');
const path = require('path');
const readline = require('readline');

const logPath = 'C:\\Users\\ULTRA\\.gemini\\antigravity\\brain\\2b7ad4ca-1750-42d9-a035-40c5dc556706\\.system_generated\\logs\\transcript.jsonl';

async function findFooterCss() {
    if (!fs.existsSync(logPath)) return;
    const fileStream = fs.createReadStream(logPath);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    for await (const line of rl) {
        try {
            const data = JSON.parse(line);
            if (data.content && data.content.includes('footer-grid') && data.content.includes('{')) {
                // Tentativa de achar blocos de código css
                const matches = data.content.match(/```css\s+([\s\S]*?)```/g);
                if (matches) {
                    for (const match of matches) {
                        const code = match.replace(/```css\s*/, '').replace(/```$/, '');
                        if (code.includes('footer-grid')) {
                            console.log("ACHOU CSS DE FOOTER-GRID:\n", code);
                        }
                    }
                }
            }
        } catch (e) {}
    }
}
findFooterCss();
