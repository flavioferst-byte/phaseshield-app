const { exec } = require('child_process');
const path = require('path');
const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = ffmpegStatic || 'ffmpeg';

const inputAudioPath = path.join(__dirname, 'test_audio_only.mp3');
const outputAudioPath = path.join(__dirname, 'test_audio_out.mp4');

// Create 3s audio only file (MP3)
const createCmd = `"${ffmpeg}" -y -f lavfi -i sine=frequency=440:sample_rate=44100 -t 3 "${inputAudioPath}"`;

exec(createCmd, (err1, stdout1, stderr1) => {
    if (err1) {
        console.error('Failed to create audio only file:', stderr1);
        process.exit(1);
    }
    console.log('Created test_audio_only.mp3 successfully');

    // Simulate server.js when extendVideo is true or video filters are applied to audio-only file
    const filterParts = [];
    filterParts.push(`[0:a]volume=1.15,equalizer=f=1200:width_type=h:width=250:g=-10,equalizer=f=2600:width_type=h:width=350:g=-8,asetrate=44100*1.015,aresample=44100,atempo=0.985,aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo,pan=stereo|c0=c0|c1=-1*c0[clean]`);
    filterParts.push(`anoisesrc=color=pink:amplitude=0.003:sample_rate=44100,aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo[noise]`);
    filterParts.push(`[clean][noise]amix=inputs=2:duration=first:dropout_transition=0:normalize=0[aout]`);
    
    // IF HAS VIDEO FILTER FOR AUDIO-ONLY FILE:
    let vchain = `[0:v]setpts=0.999*PTS,scale='2*trunc(iw/2)':'2*trunc(ih/2)'`;
    filterParts.push(`${vchain}[vout]`);

    const filterStr = `-filter_complex "${filterParts.join(';')}"`;
    const processCmd = `"${ffmpeg}" -y -i "${inputAudioPath}" ${filterStr} -map "[vout]" -map "[aout]" -c:v libx264 -c:a aac -b:a 128k "${outputAudioPath}"`;

    console.log('Running process command for AUDIO-ONLY input with [0:v] filter:');

    exec(processCmd, (err2, stdout2, stderr2) => {
        if (err2) {
            console.error('AUDIO-ONLY PROCESS FAILED AS EXPECTED!');
            console.error('Error stderr:\n', stderr2);
        } else {
            console.log('AUDIO-ONLY PROCESS SUCCESSFUL!');
        }
    });
});
