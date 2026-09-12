const fs = require('fs');

const cssPath = 'c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\style.css';
const cssContent = fs.readFileSync(cssPath, 'utf8');

// Find all matches for hexes or rgb structures of gold
const goldRegexes = [
    /#DAB682/gi,
    /#C4994E/gi,
    /#E8CFA0/gi,
    /218,\s*182,\s*130/g,
    /196,\s*153,\s*78/g,
    /rgba\(218,\s*182,\s*130/g,
    /rgba\(196,\s*153,\s*78/g
];

console.log("Analyzing style.css for gold accents:");
goldRegexes.forEach(regex => {
    const matches = cssContent.match(regex);
    console.log(`${regex.toString()}: ${matches ? matches.length : 0} matches`);
});
