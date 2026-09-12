const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\ULTRA\\Desktop\\Phase_C - Copia\\app.js', 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
    if (/applyPlanToUI|dailyLimit|quota-usage|getUsageToday/i.test(line)) {
        console.log(`${index + 1}: ${line.trim()}`);
    }
});
