const fs = require('fs');

const adminFile = 'c:/Users/ULTRA/Desktop/Phase_C - Copia - Copia/admin.html';

if (fs.existsSync(adminFile)) {
    let content = fs.readFileSync(adminFile, 'utf8');

    // 1. Hex replacements
    content = content.replace(/#7C3AED/gi, '#dfb15b'); // Purple -> Gold
    content = content.replace(/#C026D3/gi, '#A3835B'); // Fuchsia -> Dark Bronze Gold

    // 2. RGBA replacements for 124, 58, 237 (Purple) -> 223, 177, 91 (Gold)
    content = content.replace(/rgba\(124,\s*58,\s*237,/gi, 'rgba(223, 177, 91,');
    content = content.replace(/rgba\(124,58,237,/gi, 'rgba(223, 177, 91,');

    // 3. RGBA replacements for 192, 38, 211 (Fuchsia) -> 163, 131, 91 (Bronze-Gold)
    content = content.replace(/rgba\(192,\s*38,\s*211,/gi, 'rgba(163, 131, 91,');
    content = content.replace(/rgba\(192,38,211,/gi, 'rgba(163, 131, 91,');

    // 4. Update CSS root variables
    // (Ensure --primary is gold, --accent is cream/bronze-gold)
    content = content.replace(/--primary:\s*#7C3AED;/gi, '--primary: #dfb15b;');
    content = content.replace(/--accent:\s*#C026D3;/gi, '--accent: #EAD2B2;');

    // 5. Update typography and logo in admin.html to match the new minimalist layout
    // Replace the Login Logo
    content = content.replace(
        '<div class="login-logo">Black<span>Voice</span> Admin</div>',
        '<div class="login-logo" style="margin-bottom: 24px;"><span style="font-family:\'Space Grotesk\', sans-serif; font-size: 26px; letter-spacing: -0.5px; display: inline-flex; align-items: center; justify-content: center;"><strong style="font-weight: 900; color: #ffffff;">Black</strong><span style="font-weight: 300; color: #dfb15b; margin-left: 1px;">Voice</span> <span style="font-weight: 300; font-size: 1.1rem; opacity: 0.5; margin-left: 8px;">Admin</span></span></div>'
    );

    // Replace the Sidebar Brand logo
    content = content.replace(
        '<div class="sidebar-brand">Black<span>Voice</span></div>',
        '<div class="sidebar-brand" style="margin-bottom: 32px; padding-left: 6px;"><span style="font-family:\'Space Grotesk\', sans-serif; font-size: 22px; letter-spacing: -0.5px; display: inline-flex; align-items: center;"><strong style="font-weight: 900; color: #ffffff;">Black</strong><span style="font-weight: 300; color: #dfb15b; margin-left: 1px;">Voice</span></span></div>'
    );

    fs.writeFileSync(adminFile, content, 'utf8');
    console.log(`Successfully updated admin.html with gold theme!`);
} else {
    console.log('admin.html not found.');
}
