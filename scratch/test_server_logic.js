const { exec } = require('child_process');
const path = require('path');
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
            if (fpsMatch) fps = parseFloat(fpsMatch[1]);
            resolve({ duration, hasAudio, hasVideo, width, height, fps: isNaN(fps) ? 30 : fps });
        });
    });
};

async function runTest(inputPath, originalName, extendVideo = true) {
    console.log(`\n--- TESTING: ${originalName} (extendVideo=${extendVideo}) ---`);
    const meta = await inspectFileWithFFmpeg(inputPath);
    console.log('Meta:', meta);

    const hasVideo = !!meta.hasVideo;
    const hasAudio = !!meta.hasAudio;
    const ext = path.extname(originalName).toLowerCase();

    let acodec = '-c:a aac -b:a 128k';
    if (ext === '.mp3') {
        acodec = '-c:a libmp3lame -b:a 192k';
    } else if (ext === '.wav') {
        acodec = '-c:a pcm_s16le';
    }

    let filterParts = [];
    let inputs = [`-i "${inputPath}"`];

    let mapAudio = '';
    if (hasAudio) {
        filterParts.push(`[0:a]volume=1.15,equalizer=f=1200:width_type=h:width=250:g=-10,equalizer=f=2600:width_type=h:width=350:g=-8,asetrate=44100*1.015,aresample=44100,atempo=0.985,aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo,pan=stereo|c0=c0|c1=-1*c0[clean]`);
        filterParts.push(`anoisesrc=color=pink:amplitude=0.003:sample_rate=44100,aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo[noise]`);
        filterParts.push(`[clean][noise]amix=inputs=2:duration=first:dropout_transition=0:normalize=0[aout]`);
        mapAudio = '-map "[aout]"';
    } else {
        mapAudio = '-an';
    }

    let mapVideo = '';
    let vcodec = '';
    if (hasVideo) {
        mapVideo = '-map "[vout]"';
        vcodec = '-c:v:0 libx264 -preset ultrafast -tune zerolatency -crf 30 -threads 0 -pix_fmt yuv420p';
        filterParts.push(`[0:v]setpts=0.999*PTS,scale='2*trunc(iw/2)':'2*trunc(ih/2)'[vout]`);
    } else {
        mapVideo = '-vn';
        vcodec = '';
    }

    const filterStr = filterParts.length > 0 ? `-filter_complex "${filterParts.join(';')}"` : '';
    const outPath = path.join(__dirname, `out_${originalName}`);
    const cmd = `"${ffmpeg}" -y ${inputs.join(' ')} ${filterStr} ${mapVideo} ${mapAudio} ${vcodec} ${acodec} -shortest "${outPath}"`;

    console.log('Cmd:', cmd);

    return new Promise((resolve) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                console.error('FAILED:', stderr);
                resolve(false);
            } else {
                console.log('SUCCESS!');
                resolve(true);
            }
        });
    });
}

async function main() {
    const audioRes = await runTest(path.join(__dirname, 'test_audio_only.mp3'), 'cr04_audio.mp3', true);
    const videoRes = await runTest(path.join(__dirname, 'test_in.mp4'), 'cr04_video.mp4', true);
    if (audioRes && videoRes) {
        console.log('\n✅ ALL TESTS PASSED CLEANLY (VIDEO AND MP3 AUDIO)!');
    } else {
        console.error('\nTEST FAILURE!');
        process.exit(1);
    }
}

main();
