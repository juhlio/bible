const books = require('./bdfiles/books');
const verses = require('./bdfiles/verses');
const audios = require('./bdfiles/audios');
const keywords = require('./bdfiles/keywords');

const express = require('express');
const app = express();

const port = 3000;

const server = app.listen(port, function () {
    console.log('Servidor rodando na porta ' + port)
});

//app.get('/', (req, res) => {

   /*  const resposta = { mensagem: 'Operação realizada com sucesso!' };
    res.status(200).json(resposta); */

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
        images: require('./robots/images'),
        analysetext: require('./robots/analysetext'),

    }


    async function start() {

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

    start()

//})


