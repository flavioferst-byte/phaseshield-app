const fs = require('fs');

const htmlContent = fs.readFileSync('c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\index.html', 'utf8');
const lines = htmlContent.split('\n');

console.log("Gold lines in index.html:");
lines.forEach((line, index) => {
    if (/#DAB682|#C4994E|#E8CFA0|218,\s*182,\s*130|196,\s*153,\s*78/.test(line)) {
        console.log(`${index + 1}: ${line.trim()}`);
    }
});
