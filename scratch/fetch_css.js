const https = require('https');
const fs = require('fs');
const path = require('path');

const cssFiles = [
    {
        url: 'https://www.maskai.co/_next/static/chunks/bbe15931be9615d8.css',
        dest: 'c:/Users/ULTRA/Desktop/Phase_C - Copia/static/maskai1.css'
    },
    {
        url: 'https://www.maskai.co/_next/static/chunks/9eb797741c5bb68e.css',
        dest: 'c:/Users/ULTRA/Desktop/Phase_C - Copia/static/maskai2.css'
    }
];

function download(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
            }
            const file = fs.createWriteStream(dest);
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${url} -> ${dest}`);
                resolve();
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function run() {
    try {
        for (const item of cssFiles) {
            await download(item.url, item.dest);
            // Also copy to root directory just in case
            const base = path.basename(item.dest);
            fs.copyFileSync(item.dest, path.join('c:/Users/ULTRA/Desktop/Phase_C - Copia', base));
        }
        console.log('Styles fetched and copied successfully!');
    } catch (e) {
        console.error('Error fetching styles:', e);
    }
}

run();
