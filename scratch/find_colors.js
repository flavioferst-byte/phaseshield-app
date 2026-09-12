const fs = require('fs');
const content = fs.readFileSync('C:/Users/ULTRA/.gemini/antigravity/brain/972ca554-e8f2-4f4a-a0d9-34d8f6fa8cf5/.system_generated/steps/2358/content.md', 'utf8');

const regex = /#[0-9a-fA-F]{6}/g;
const matches = content.match(regex);
if (matches) {
    const unique = [...new Set(matches.map(c => c.toLowerCase()))];
    console.log('Hex colors found:', unique);
} else {
    console.log('No hex colors found.');
}
