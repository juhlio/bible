// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();



const puppeteer = require('puppeteer');
//import fetch from 'node-fetch';
const fs = require('fs');
const fetch = require('node-fetch');
const books = require('../bdfiles/books');
const verses = require('../bdfiles/verses');
const images = require('../bdfiles/images');


async function robot(v) {

    console.log('robo de imagens on')

    

    getImage(v)



    async function getImage(v) {

        //let verse = translateText(v.verse)
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        console.log(`Abrindo o discord`)
        await page.goto('https://discord.com/channels/1077326214852776027/1077326214852776030');
        await page.waitForNavigation();
        await page.waitForTimeout(10000);
        await page.type('[name=email]', "julioramos.esporte@gmail.com")
        await page.type('[name=password]', "Ju7Li8o9")
        await page.waitForTimeout(2000);
        await page.keyboard.press('Enter');
        await page.waitForNavigation();
        await page.goto('https://discord.com/channels/1077326214852776027/1077326214852776030');

        console.log(`Login realizado começando a criação da imagem`)
        await page.waitForTimeout(5000);
        await page.type('div[data-slate-node="element"]', '/imagine');
        await page.waitForTimeout(10000);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(3000);
        await page.keyboard.type(v.keyWords);
        await page.waitForTimeout(3000);
        //await page.keyboard.type(verse);
        await page.keyboard.press('Enter');
        console.log(`Imagem solicitada, aguardando o midjourney`)
        await page.waitForTimeout(60000);


        let messages = await page.$$('li.messageListItem-ZZ7v6g');
        const lastMessage = messages[messages.length - 1];
        const button = await lastMessage.$('button');
        await button.click();
        console.log(`Pedindo o up da primeira imagem`)
        await page.waitForTimeout(60000);

        await page.goto('https://discord.com/channels/1077326214852776027/1077326214852776030');
        //await page.waitForNavigation();
        await page.waitForTimeout(30000);

        let messagesAgain = await page.$$('li.messageListItem-ZZ7v6g');
        let lastMessageAgain = messagesAgain[messagesAgain.length - 1];

        const imageSrcList = await lastMessageAgain.$$eval('img', imgElements => imgElements.map(img => img.src));
        //console.log(imageSrcList);
        let splitImage = imageSrcList[2].split('?')
        let linkImage = splitImage[0];
        console.log(linkImage);
        let imageName = `${v.bookAbbrev}-${v.chapterNumber}-${v.verseNumber}_${v.id}.png`
        //const imageUrl = 'https://example.com/image.jpg';
        const imagePath = `./images/${imageName}`;
        downloadImage(linkImage, imagePath);
        await browser.close();
        console.log(`Salvando informações no banco`)
        const createImage = await images.create({
            idVerse: v.dataValues.id,
            bookAbbrev: v.dataValues.bookAbbrev,
            chapterNumber: v.dataValues.chapterNumber,
            verseNumber: v.dataValues.verseNumber,
            imageFile: imageName,
        })
        console.log(`Atualizando informações no banco`)

        verses.update({ handled: true }, { where: { id: v.dataValues.id } })
            .then(() => {
                console.log('Registro atualizado com sucesso!');
            })
            .catch((erro) => {
                console.error('Ocorreu um erro ao atualizar o registro:', erro);
            });
        console.log(`Indo pra próxima`)



    }

    async function downloadImage(url, path) {
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFile(path, buffer, () => console.log('Imagem salva com sucesso!'));
    }




}

module.exports = robot
