/**
 * BlackVoice Security Engine - Anti-Inspection & Source Code Shield
 * Protects premium intellectual property and deters reverse engineering.
 */
(function() {
    'use strict';

    // 1. Disable Right Click (Context Menu)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // 2. Prevent Developer Shortcuts
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Ctrl + Shift + I (Inspect)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
            e.preventDefault();
            return false;
        }
        // Ctrl + Shift + J (Console)
        if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.keyCode === 74)) {
            e.preventDefault();
            return false;
        }
        // Ctrl + Shift + C (Element selector)
        if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.keyCode === 67)) {
            e.preventDefault();
            return false;
        }
        // Ctrl + U (View Source)
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
            e.preventDefault();
            return false;
        }
        // Ctrl + S (Save Page)
        if (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
            e.preventDefault();
            return false;
        }
        // Ctrl + H (History) or others
        if (e.ctrlKey && (e.key === 'h' || e.key === 'H' || e.keyCode === 72)) {
            e.preventDefault();
            return false;
        }
    });

    // 3. Security Protection
})();
