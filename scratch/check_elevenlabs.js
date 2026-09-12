const https = require('https');

const apiKey = 'sk_1e3e182918d7c0fe86f8ed06bfaded77b3dc07ee99588c4e';
const voiceId = '21m00Tcm4TlvDq8ikWAM';

function testModel(modelId) {
    return new Promise((resolve) => {
        const data = JSON.stringify({
            text: 'Prueba de voz en español y portugués para camuflaje.',
            model_id: modelId,
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75
            }
        });

        const options = {
            method: 'POST',
            headers: {
                'xi-api-key': apiKey,
                'Content-Type': 'application/json',
                'accept': 'audio/mpeg'
            }
        };

        const req = https.request(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => { responseData += chunk; });
            res.on('end', () => {
                resolve({ modelId, status: res.statusCode, response: responseData.slice(0, 150) });
            });
        });

        req.on('error', (err) => {
            resolve({ modelId, status: 500, response: err.message });
        });

        req.write(data);
        req.end();
    });
}

async function run() {
    const models = ['eleven_flash_v2_5', 'eleven_flash_v2', 'eleven_multilingual_v2', 'eleven_turbo_v2_5'];
    for (const model of models) {
        const res = await testModel(model);
        console.log(`Model: ${res.modelId} -> Status: ${res.status}`);
        console.log(`Response Snippet: ${res.response}`);
        console.log('-----------------------------');
    }
}

run();
