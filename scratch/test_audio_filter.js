const { exec } = require('child_process');

const filter = '[0:a]volume=1.15,equalizer=f=1200:width_type=h:width=250:g=-10,equalizer=f=2600:width_type=h:width=350:g=-8,asetrate=44100*1.015,aresample=44100,atempo=0.985,aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo,pan=stereo|c0=c0|c1=-1*c0[orig];anoisesrc=color=pink:amplitude=0.003:sample_rate=44100,aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo[noise];[orig][noise]amix=inputs=2:duration=first:dropout_transition=0:normalize=0[aout]';

console.log('Testing FFmpeg filter syntax...');
exec(`ffmpeg -y -f lavfi -i sine=frequency=440:sample_rate=44100:duration=3 -filter_complex "${filter}" -map "[aout]" -c:a aac scratch/test_camouflaged_audio.mp4`, (err, stdout, stderr) => {
    if (err) {
        console.error('FILTER ERROR:', stderr);
    } else {
        console.log('✅ FILTER SUCCESS! Output generated cleanly.');
    }
});
