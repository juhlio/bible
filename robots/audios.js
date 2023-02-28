const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const books = require('../bdfiles/books');
const verses = require('../bdfiles/verses');
const audios = require('../bdfiles/audios');


async function robot(v) {



    const client = new textToSpeech.TextToSpeechClient();


    newAudio(v)


    async function newAudio(v) {

        let config = {


            idVerse: v.id,
            book: v.bookAbbrev,
            chapter: v.chapterNumber,
            verse: v.verseNumber,
            text: v.verse,

        }


        // The text to synthesize
        const text = 'No princípio criou Deus o céu e a terra.';

        // Construct the request
        const request = {
            input: { text: config.text },
            // Select the language and SSML voice gender (optional)
            voice: { languageCode: 'pt-BR', name: 'pt-BR-Standard-B' },
            // select the type of audio encoding
            audioConfig: { audioEncoding: 'MP3' },
        };

        let audioName = `${config.book}-${config.chapter}-${config.verse}_${config.idVerse}.mp3`
        // Performs the text-to-speech request
        const [response] = await client.synthesizeSpeech(request);
        // Write the binary audio content to a local file
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(`../bible/audios/${audioName}`, response.audioContent, 'binary');
        console.log(`Audio content written to file: ${config.book}-${config.chapter}-${config.verse}_${config.idVerse}.mp3`);

        const createAudio = await audios.create({
            idVerse: config.idVerse,
            bookAbbrev: config.book,
            chapterNumber: config.chapter,
            verseNumber: config.verse,
            audioFile: audioName,
        })

    }

    return v

    

}



module.exports = robot