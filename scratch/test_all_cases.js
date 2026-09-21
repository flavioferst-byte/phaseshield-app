const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = ffmpegStatic || 'ffmpeg';

const inspectFileWithFFmpeg = (filePath) => {
    return new Promise((resolve) => {
        exec(`"${ffmpeg}" -i "${filePath}"`, (err, stdout, stderr) => {
            const output = (stderr || '') + (stdout || '');
            let duration = 0;
            const durMatch = output.match(/Duration:\s+(\d+):(\d+):(\d+\.\d+)/);
            if (durMatch) {
                duration = parseInt(durMatch[1]) * 3600 + parseInt(durMatch[2]) * 60 + parseFloat(durMatch[3]);
            }
            const hasAudio = /Stream\s+#\d+:\d+.*Audio:/i.test(output);
            const hasVideo = /Stream\s+#\d+:\d+.*Video:/i.test(output);
            
            let width = 1080;
            let height = 1920;
            let fps = 30;
            const resMatch = output.match(/Stream\s+#\d+:\d+.*Video:.*?\s+(\d{2,5})x(\d{2,5})/i);
            if (resMatch) {
                width = parseInt(resMatch[1]);
                height = parseInt(resMatch[2]);
            }
            const fpsMatch = output.match(/(\d+(?:\.\d+)?)\s+fps/i);
            if (fpsMatch) {
                fps = parseFloat(fpsMatch[1]);
            }
            
            resolve({ duration, hasAudio, hasVideo, width, height, fps: isNaN(fps) ? 30 : fps });
        });
    });
};

async function testAll() {
    console.log('Testing inspectFileWithFFmpeg on various files...');
    const testAudio = path.join(__dirname, 'test_audio_only.mp3');
    const testVideo = path.join(__dirname, 'test_in.mp4');

    const metaAudio = await inspectFileWithFFmpeg(testAudio);
    console.log('Audio file meta:', metaAudio);

    const metaVideo = await inspectFileWithFFmpeg(testVideo);
    console.log('Video file meta:', metaVideo);
}

testAll();
