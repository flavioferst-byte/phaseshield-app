const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = ffmpegStatic || 'ffmpeg';

const inputPath = path.join(__dirname, 'test_in.mp4');
const part1Path = path.join(__dirname, 'test_part1_fast.mp4');
const part2Path = path.join(__dirname, 'test_part2_fast.mp4');
const concatTxtPath = path.join(__dirname, 'test_concat_fast.txt');
const finalOutPath = path.join(__dirname, 'test_fast_extended_out.mp4');

async function testFastExtension() {
    console.log('--- TESTING ULTRA FAST 10-MINUTE EXTENSION ---');
    const start = Date.now();

    // Part 1: Main video (3s)
    const part1Cmd = `"${ffmpeg}" -y -i "${inputPath}" -c:v libx264 -preset ultrafast -tune zerolatency -crf 30 -pix_fmt yuv420p -c:a aac -b:a 128k "${part1Path}"`;
    await new Promise(r => exec(part1Cmd, r));
    console.log(`Part 1 done in ${Date.now() - start}ms`);

    // Part 2: 10-minute static extension at 1 fps (600 seconds = 600 frames instead of 18,000 frames!)
    const part2Start = Date.now();
    const extendSeconds = 600;
    const part2Cmd = `"${ffmpeg}" -y -f lavfi -i color=c=black:s=640x360:r=1 -f lavfi -t ${extendSeconds} -i anullsrc=r=44100:cl=stereo -t ${extendSeconds} -c:v libx264 -preset ultrafast -tune zerolatency -crf 32 -pix_fmt yuv420p -r 1 -g 100 -c:a aac -b:a 128k "${part2Path}"`;
    await new Promise(r => exec(part2Cmd, r));
    console.log(`Part 2 (10-minute extension) created in ${Date.now() - part2Start}ms!`);

    // Part 3: Concat
    const concatStart = Date.now();
    fs.writeFileSync(concatTxtPath, `file '${part1Path.replace(/\\/g, '/')}'\nfile '${part2Path.replace(/\\/g, '/')}'\n`);
    const concatCmd = `"${ffmpeg}" -y -f concat -safe 0 -i "${concatTxtPath}" -c copy "${finalOutPath}"`;
    await new Promise(r => exec(concatCmd, r));
    console.log(`Part 3 (Concat) done in ${Date.now() - concatStart}ms!`);

    console.log(`TOTAL TIME FOR 10-MINUTE VIDEO EXTENSION: ${Date.now() - start}ms`);
}

testFastExtension().catch(console.error);
