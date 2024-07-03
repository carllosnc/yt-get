const fs = require('fs');
const ytdl = require('ytdl-core');

/**
 * Download mp3 audio from an YouTube URL.
 *
 * @param {String} ytUrl YouTube video URL.
 * @param {String} filePath Absolute filepath where audio file should be saved.
 */
async function downloadAsAudio(ytUrl, filePath) {
    return new Promise(async (resolve) => {
        ytdl(ytUrl, {
            filter: 'audioonly',
            quality: 'highestaudio',
        }).pipe(fs.createWriteStream(filePath)).on('finish', () => resolve());
    });
}

/**
 * Download multiple audios from an array of YouTube URLs.
 *
 * @param {Array} ytUrls Array of YouTube video URLs.
 */
async function getAudios(ytUrls) {
    for (const ytUrl of ytUrls) {
        await downloadAsAudio(ytUrl, `audios/${ytUrl.split('=')[1]}.mp3`);
        console.log(`Audio downloaded for ${ytUrl}`);
    }
}

getAudios([
    // 'https://www.youtube.com/watch?v=7hpfifR6JaM&ab_channel=prodbyIOF',
    // 'https://www.youtube.com/watch?v=ksBwjhV1xFw&ab_channel=VELVET',
    // 'https://www.youtube.com/watch?v=tVVCVZsAUE8&ab_channel=beej',
    // 'https://www.youtube.com/watch?v=PL0bPhpq1R0&ab_channel=BlackEaglebeats'
]);
