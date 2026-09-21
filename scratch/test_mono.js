const { exec } = require('child_process');
const path = require('path');
const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = ffmpegStatic || 'ffmpeg';

const inputMonoPath = path.join(__dirname, 'test_mono.mp4');
const outputMonoPath = path.join(__dirname, 'test_mono_out.mp4');

// Create 3s video with MONO audio
const createCmd = `"${ffmpeg}" -y -f lavfi -i testsrc=size=640x360:rate=30 -f lavfi -i sine=frequency=440:sample_rate=44100:beep_factor=2 -ac 1 -t 3 "${inputMonoPath}"`;

exec(createCmd, (err1, stdout1, stderr1) => {
    if (err1) {
        console.error('Failed to create mono test file:', stderr1);
        process.exit(1);
    }
    console.log('Created test_mono.mp4 successfully');

    const filterParts = [];
    filterParts.push(`[0:a]volume=1.15,equalizer=f=1200:width_type=h:width=250:g=-10,equalizer=f=2600:width_type=h:width=350:g=-8,asetrate=44100*1.015,aresample=44100,atempo=0.985,aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo,pan=stereo|c0=c0|c1=-1*c0[clean]`);
    filterParts.push(`anoisesrc=color=pink:amplitude=0.003:sample_rate=44100,aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo[noise]`);
    filterParts.push(`[clean][noise]amix=inputs=2:duration=first:dropout_transition=0:normalize=0[aout]`);

    const filterStr = `-filter_complex "${filterParts.join(';')}"`;
    const processCmd = `"${ffmpeg}" -y -i "${inputMonoPath}" ${filterStr} -map 0:v:0? -map "[aout]" -c:v copy -c:a aac -b:a 128k -shortest "${outputMonoPath}"`;

    console.log('Running process command for MONO input:');

    exec(processCmd, (err2, stdout2, stderr2) => {
        if (err2) {
            console.error('MONO PROCESS FAILED!');
            console.error('Error stderr:\n', stderr2);
        } else {
            console.log('MONO PROCESS SUCCESSFUL!');
        }
    });
});
