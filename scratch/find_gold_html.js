const fs = require('fs');

const htmlPath = 'c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\index.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const goldRegexes = [
    /#DAB682/gi,
    /#C4994E/gi,
    /#E8CFA0/gi,
    /218,\s*182,\s*130/g,
    /196,\s*153,\s*78/g,
    /rgba\(218,\s*182,\s*130/g,
    /rgba\(196,\s*153,\s*78/g
];

console.log("Analyzing index.html for gold accents:");
goldRegexes.forEach(regex => {
    const matches = htmlContent.match(regex);
    console.log(`${regex.toString()}: ${matches ? matches.length : 0} matches`);
});
