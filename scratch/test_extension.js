const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = ffmpegStatic || 'ffmpeg';

const inputPath = path.join(__dirname, 'test_in.mp4');
const part1Path = path.join(__dirname, 'test_part1.mp4');
const part2Path = path.join(__dirname, 'test_part2.mp4');
const concatTxtPath = path.join(__dirname, 'test_concat.txt');
const finalOutPath = path.join(__dirname, 'test_extended_out.mp4');

async function testExtension() {
    console.log('Testing video extension pipeline...');

    // Part 1: main video
    const part1Cmd = `"${ffmpeg}" -y -i "${inputPath}" -c:v libx264 -preset ultrafast -crf 30 -pix_fmt yuv420p -c:a aac -b:a 128k "${part1Path}"`;
    await new Promise(r => exec(part1Cmd, r));
    console.log('Part 1 created.');

    // Part 2: 10 second extension with black background fallback test
    const outWidth = 640;
    const outHeight = 360;
    const fps = 30;
    const extendSeconds = 5;
    
    // Test lavfi color fallback input
    const part2Cmd = `"${ffmpeg}" -y -f lavfi -i color=c=black:s=${outWidth}x${outHeight}:r=${fps} -f lavfi -t ${extendSeconds} -i anullsrc=r=44100:cl=stereo -t ${extendSeconds} -c:v libx264 -preset ultrafast -crf 30 -pix_fmt yuv420p -c:a aac -b:a 128k "${part2Path}"`;
    
    await new Promise((resolve, reject) => {
        exec(part2Cmd, (err, stdout, stderr) => {
            if (err) {
                console.error('Part 2 failed:', stderr);
                reject(err);
            } else {
                console.log('Part 2 created with black canvas fallback.');
                resolve();
            }
        });
    });

    // Part 3: concat
    fs.writeFileSync(concatTxtPath, `file '${part1Path.replace(/\\/g, '/')}'\nfile '${part2Path.replace(/\\/g, '/')}'\n`);
    const concatCmd = `"${ffmpeg}" -y -f concat -safe 0 -i "${concatTxtPath}" -c copy "${finalOutPath}"`;
    await new Promise((resolve, reject) => {
        exec(concatCmd, (err, stdout, stderr) => {
            if (err) {
                console.error('Concat failed:', stderr);
                reject(err);
            } else {
                console.log('Concat SUCCESSFUL! Final video size:', fs.statSync(finalOutPath).size);
                resolve();
            }
        });
    });
}

testExtension().catch(console.error);
