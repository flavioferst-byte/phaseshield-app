const fs = require('fs');

if (fs.existsSync('c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\dashboard.html')) {
    const htmlContent = fs.readFileSync('c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\dashboard.html', 'utf8');
    const lines = htmlContent.split('\n');

    console.log("Gold lines in dashboard.html:");
    lines.forEach((line, index) => {
        if (/#DAB682|#C4994E|#E8CFA0|218,\s*182,\s*130|196,\s*153,\s*78/.test(line)) {
            console.log(`${index + 1}: ${line.trim()}`);
        }
    });
} else {
    console.log("dashboard.html does not exist");
}
