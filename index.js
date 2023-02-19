const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const books = require('./bdfiles/books');
const verses = require('./bdfiles/verses');

(async () => {
    const database = require('./db');

    try {
        const resultado = await database.sync();
        //console.log(resultado);
    } catch (error) {
        //console.log(error);
    }
})();

const robots = {

    books: require('./robots/books'),
    verses: require('./robots/verses'),
    audios: require('./robots/audios'),

}

/* const client = new textToSpeech.TextToSpeechClient();
async function quickStart() {
  // The text to synthesize
  const text = 'No princípio criou Deus o céu e a terra.';

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'pt-BR', name:'pt-BR-Standard-B'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('audios/output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}
quickStart();
 */

async function start() {

    //await robots.books()
    //await robots.verses()
    await robots.audios()
}

start()




