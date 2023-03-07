const books = require('./bdfiles/books');
const verses = require('./bdfiles/verses');
const audios = require('./bdfiles/audios');
const keywords = require('./bdfiles/keywords');
const cron = require('node-cron');


/* (async () => {
    const database = require('./db');
    try {
        const resultado = await database.sync();
        //console.log(resultado);
    } catch (error) {
        //console.log(error);
    }
})();
 */
const robots = {

    books: require('./robots/books'),
    verses: require('./robots/verses'),
    audios: require('./robots/audios'),
    images: require('./robots/images'),
    analysetext: require('./robots/analysetext'),

}







async function run() {



    //await robots.books()
    //await robots.verses()

    let v = await verses.findOne({
        where: { handled: false },
        order: [['id', 'ASC']],
        /* where: {
            bookAbbrev: "gn",
            chapterNumber: 1,
            verseNumber: 1,
        } */
    })


    let audio = await audios.findOne({
        where: {
            idVerse: v.id
        }
    })

    if (audio) {
        console.log('Já existe audio.. acionando proximo robô')
    } else {
        console.log('Iniciando criação do audio')
        await robots.audios(v)
    }

    let keys = await keywords.findOne({
        where: {
            idVerse: v.id
        }
    })

    if (keys) {
        console.log('Palavras chave já existem... acionando próximo robô')
        v.keyWords = keys.enKeys
        await robots.images(v)


    } else {
        console.log('Acionando robô de palavras chave')
        let keyWords = await robots.analysetext(v)
        await robots.images(keyWords)

    }

}

async function start() {
    while (true) {
        try {
            await run();
            break;
        } catch (error) {
            console.error('Ocorreu um erro:', error);
            console.log('Tentando novamente em 5 segundos...');
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

// Executa a função start a cada 5 minutos
cron.schedule('*/5 * * * *', async () => {
    console.log('Executando a função start...');
    await start();
});


//start()