const keywordExtractor = require("keyword-extractor");
const books = require('../bdfiles/books');
const verses = require('../bdfiles/verses');
const key = require('../bdfiles/keywords');
const { Translate } = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();


async function robot(v) {

    const extractedKeywords = keywordExtractor.extract(v.verse, {
        language: "portuguese",
        remove_digits: true,
        return_changed_case: false,
        remove_duplicates: true,

    });

    let noList = ['carne', 'nudez']

    //console.log(extractedKeywords);
    let palavrasChave = ''
    //palavrasChave = extractedKeywords
    /*  extractedKeywords.forEach(keyword =>
         palavrasChave += extractedKeywords
     ) */

    for (let item of extractedKeywords) {
        if (noList.includes(item)) {

        } else {
            palavrasChave += item + ', '
        }

    }
    console.log(palavrasChave)

    let keyWords = await translateText(palavrasChave)
    v.keyWords = keyWords


    const createkey = await key.create({
        idVerse: v.dataValues.id,
        bookAbbrev: v.dataValues.bookAbbrev,
        chapterNumber: v.dataValues.chapterNumber,
        verseNumber: v.dataValues.verseNumber,
        ptKeys: palavrasChave,
        enKeys: v.keyWords[0],
    })



    async function translateText(v) {
        // Translates the text into the target language. "text" can be a string for
        // translating a single piece of text, or an array of strings for translating
        // multiple texts.

        let text = v
        let target = 'en'
        let [translations] = await translate.translate(text, target);
        translations = Array.isArray(translations) ? translations : [translations];
        console.log('Translations:');
        translations.forEach((translation, i) => {
            //console.log(`${text[i]} => (${target}) ${translation}`);
        });
        return translations
    }

    //return keyWords
    return v
}


module.exports = robot