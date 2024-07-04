#!/usr/bin/env node

import { createWriteStream } from 'fs';
import ytdl from 'ytdl-core';
import { input, select } from '@inquirer/prompts';

async function getVideo(ytUrl, type, filePath) {
    let quality
    let extension

    if (type === 'audioandvideo') {
        quality = 'highest';
        extension = '.mp4';
    } else {
        quality = 'highestaudio';
        extension = '.mp3';
    }

    return new Promise(async (resolve) => {
        ytdl(ytUrl, {
            filter: type,
            quality: quality
        }).pipe(createWriteStream(filePath + extension)).on('finish', () => resolve());
    });
}

function checkYouTubeUrl(url) {
    const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regex);
    return (match && match[2].length === 11);
}

const videoUrl = await input({ message: 'YouTube URL:' });

if (!checkYouTubeUrl(videoUrl)) {
    console.log('Not a YouTube URL');
    process.exit(1);
}

const mediaType = await select({
    message: 'Type of media:',
    choices: [
        {
            name: 'Video',
            value: 'audioandvideo'
        },
        {
            name: 'Audio',
            value: 'audioonly'
        }
    ]
});

await getVideo(videoUrl, mediaType, ytdl.getVideoID(videoUrl));
console.log('Done!');
