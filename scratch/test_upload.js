const https = require('https');

const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
const header = '--' + boundary + '\r\n' +
    'Content-Disposition: form-data; name="file"; filename="cr01.mp4"\r\n' +
    'Content-Type: video/mp4\r\n\r\n';
const footer = '\r\n--' + boundary + '--\r\n';

const fileBuf = Buffer.alloc(1000);
const bodyBuf = Buffer.concat([
    Buffer.from(header, 'utf8'),
    fileBuf,
    Buffer.from(footer, 'utf8')
]);

const req = https.request({
    hostname: 'cloakerblackvoice.com.br',
    port: 443,
    path: '/api/process',
    method: 'POST',
    headers: {
        'Content-Type': 'multipart/form-data; boundary=' + boundary,
        'Content-Length': bodyBuf.length
    }
}, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => console.log('TEST PROCESS UPLOAD STATUS:', res.statusCode, 'BODY:', body));
});

req.write(bodyBuf);
req.end();
