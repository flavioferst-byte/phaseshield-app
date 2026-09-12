const fs = require('fs');

if (fs.existsSync('c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\app.js')) {
    const jsContent = fs.readFileSync('c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\app.js', 'utf8');
    const lines = jsContent.split('\n');

    console.log("Gold lines in app.js:");
    lines.forEach((line, index) => {
        if (/gold/i.test(line)) {
            console.log(`${index + 1}: ${line.trim()}`);
        }
    });
} else {
    console.log("app.js does not exist");
}
