const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const books = require('../bdfiles/books');
const verses = require('../bdfiles/verses');


async function robot() {



    const client = new textToSpeech.TextToSpeechClient();
    let v = await verses.findByPk(195)
    newAudio(v)
    async function newAudio(v) {

        let config = {


            idVerse: v.id,
            book: v.bookAbbrev,
            chapter: 8,
            verse: 11,
            text: 'E a pomba voltou a ele à tarde; e eis, arrancada, uma folha de oliveira no seu bico; e conheceu Noé que as águas tinham minguado de sobre a terra.',

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

        // Performs the text-to-speech request
        const [response] = await client.synthesizeSpeech(request);
        // Write the binary audio content to a local file
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(`../bible/audios/${config.book}-${config.chapter}-${config.verse}_${config.idVerse}.mp3`, response.audioContent, 'binary');
        console.log(`Audio content written to file: ${config.book}-${config.chapter}-${config.verse}_${config.idVerse}.mp3`);
    }


    //newAudio();

}



module.exports = robot