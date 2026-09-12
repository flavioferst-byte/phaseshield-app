const fs = require('fs');

const files = [
    'c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\style.css',
    'c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\index.html',
    'c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\dashboard.html',
    'c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\auth.html'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, index) => {
            if (/#C9A060|#E8C97A/i.test(line)) {
                console.log(`${file} @ ${index + 1}: ${line.trim()}`);
            }
        });
    }
});
