const fs = require('fs');

const files = [
    'c:/Users/ULTRA/Desktop/Phase_C - Copia - Copia/style.css',
    'c:/Users/ULTRA/Desktop/Phase_C - Copia - Copia/auth.html',
    'c:/Users/ULTRA/Desktop/Phase_C - Copia - Copia/dashboard.html',
    'c:/Users/ULTRA/Desktop/Phase_C - Copia - Copia/index.html'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // Hex replacements
        content = content.replace(/#a78bfa/gi, '#dfb15b'); // Light purple -> Gold
        content = content.replace(/#8b5cf6/gi, '#A3835B'); // Neon purple -> Dark Gold
        content = content.replace(/#7c3aed/gi, '#785b34'); // Deep purple -> Deep Bronze Gold
        content = content.replace(/#c084fc/gi, '#EAD2B2'); // Violet -> Light Cream Gold

        // RGBA replacements
        content = content.replace(/rgba\(167,\s*139,\s*250,/g, 'rgba(223, 177, 91,');
        content = content.replace(/rgba\(139,\s*92,\s*246,/g, 'rgba(163, 131, 91,');
        content = content.replace(/rgba\(217,\s*70,\s*239,/g, 'rgba(223, 177, 91,');

        // Linear gradient fuchsia -> gold fixes
        // (if any buttons are still fading to fuchsia/purple)
        content = content.replace(/linear-gradient\(135deg,\s*var\(--primary-neon\),\s*var\(--secondary-neon\)\)/g, 'linear-gradient(135deg, var(--primary-neon), var(--accent))');

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Successfully updated ${file}`);
    }
});
console.log('Gold theme transformation complete.');
