const fs = require('fs');

const srcPath = 'C:\\Users\\ULTRA\\.gemini\\antigravity\\brain\\2b7ad4ca-1750-42d9-a035-40c5dc556706\\.system_generated\\steps\\214\\content.md';
const html = fs.readFileSync(srcPath, 'utf8');

const targetIndex = html.indexOf('id="como-funciona"');
console.log('como-funciona index:', targetIndex);

const dashboardIndex = html.indexOf('Dashboard</h2>');
if (dashboardIndex !== -1) {
    console.log('Found Dashboard!! index:', dashboardIndex);
    // Print 2000 chars before and after
    console.log(html.substring(dashboardIndex - 500, dashboardIndex + 3000));
} else {
    // Try lowercase or other search
    const sectionIndex = html.indexOf('Dashboard');
    console.log('Found Dashboard word index:', sectionIndex);
    console.log(html.substring(sectionIndex - 300, sectionIndex + 3000));
}
