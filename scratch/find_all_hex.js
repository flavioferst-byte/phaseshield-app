const fs = require('fs');

const files = [
    'c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\style.css',
    'c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\index.html',
    'c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\dashboard.html',
    'c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\auth.html'
];

const hexSet = new Set();

files.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const hexMatches = content.match(/#[0-9a-fA-F]{3,8}\b/g);
        if (hexMatches) {
            hexMatches.forEach(hex => hexSet.add(hex.toUpperCase()));
        }
    }
});

console.log("All hex codes found in the code files:");
console.log(Array.from(hexSet).sort());
