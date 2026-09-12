const fs = require('fs');

const html = fs.readFileSync('dashboard.html', 'utf8');

console.log('--- DASHBOARD HTML AUDIT (MAIN SCRIPT) ---');

const mainScriptStart = html.indexOf('<script>', 1700);
const mainScriptEnd = html.indexOf('</script>', mainScriptStart);

if (mainScriptStart === -1 || mainScriptEnd === -1) {
    console.error('Could not find main script block!');
    process.exit(1);
}

const fullJs = html.slice(mainScriptStart + 8, mainScriptEnd);
console.log(`Main JS block size: ${fullJs.length} bytes`);

// 1. Check syntax
try {
    const vm = require('vm');
    new vm.Script(fullJs);
    console.log('✅ Main JS script syntax is 100% VALID');
} catch(e) {
    console.error('❌ Main JS syntax error:', e.message);
}

// 2. Check getElementById calls vs HTML
const getElemCalls = [...fullJs.matchAll(/document\.getElementById\(["']([^"']+)["']\)/g)].map(m => m[1]);
const uniqueGetElemCalls = [...new Set(getElemCalls)];
console.log(`\nChecking ${uniqueGetElemCalls.length} getElementById calls...`);

let missingElemCount = 0;
uniqueGetElemCalls.forEach(id => {
    const idRegex = new RegExp(`id=["']${id}["']`, 'i');
    if (!idRegex.test(html)) {
        console.error(`  ❌ MISSING ELEMENT: document.getElementById('${id}') -> element with id="${id}" does not exist in HTML!`);
        missingElemCount++;
    } else {
        console.log(`  ✅ id="${id}" exists`);
    }
});

if (missingElemCount === 0) {
    console.log('\n✅ ALL getElementById target elements exist in HTML!');
} else {
    console.error(`\n❌ Total missing elements: ${missingElemCount}`);
}

console.log('\n--- AUDIT COMPLETE ---');
