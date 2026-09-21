const { exec } = require('child_process');

const filterParts = [
    '[1:a]volume=1.15,equalizer=f=1200:width_type=h:width=250:g=-10,equalizer=f=2600:width_type=h:width=350:g=-8,asetrate=44100*1.015,aresample=44100,atempo=0.985,aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo,pan=stereo|c0=c0|c1=-1*c0[clean]',
    'anoisesrc=color=pink:amplitude=0.003:sample_rate=44100,aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo[noise]',
    '[clean][noise]amix=inputs=2:duration=first:dropout_transition=0:normalize=0[aout]'
];

const filterStr = filterParts.join(';');
const cmd = `ffmpeg -y -f lavfi -i testsrc=size=1080x1920:rate=30:duration=5 -f lavfi -i sine=frequency=440:sample_rate=44100:duration=5 -filter_complex "${filterStr}" -map 0:v -map "[aout]" -c:v libx264 -preset ultrafast -c:a aac scratch/test_hang.mp4`;

console.log('Running FFmpeg test...');
const startTime = Date.now();
exec(cmd, (err, stdout, stderr) => {
    const elapsed = Date.now() - startTime;
    if (err) {
        console.error('CMD FAILED:', stderr);
    } else {
        console.log(`✅ CMD FINISHED SUCCESSFULLY in ${elapsed}ms!`);
    }
});
