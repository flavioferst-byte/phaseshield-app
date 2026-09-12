const fs = require('fs');

const files = [
    'c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\style.css',
    'c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\index.html',
    'c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\dashboard.html',
    'c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\auth.html'
];

files.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Backup first
    fs.writeFileSync(filePath + '.bak', content, 'utf8');
    
    // Replace hex codes
    content = content.replace(/#dab682/gi, '#a78bfa'); // primary light purple
    content = content.replace(/#c4994e/gi, '#8b5cf6'); // secondary purple
    content = content.replace(/#e8cfa0/gi, '#d8b4fe'); // accent lavender
    content = content.replace(/#e8c97a/gi, '#c084fc'); // hover light purple
    content = content.replace(/#c9a060/gi, '#7c3aed'); // dark purple
    
    // Replace rgba values (case-insensitive, optional spaces)
    content = content.replace(/rgba\(\s*218\s*,\s*182\s*,\s*130/gi, 'rgba(167, 139, 250');
    content = content.replace(/rgba\(\s*196\s*,\s*153\s*,\s*78/gi, 'rgba(139, 92, 246');
    
    // Replace raw rgb lists
    content = content.replace(/218\s*,\s*182\s*,\s*130/g, '167, 139, 250');
    content = content.replace(/196\s*,\s*153\s*,\s*78/g, '139, 92, 246');
    
    content = content.replace(/Gold Accent/gi, 'Purple Accent');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated ${filePath} to purple palette`);
});
