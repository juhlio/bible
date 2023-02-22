/* import puppeteer from 'puppeteer';
import fetch from 'node-fetch';
import fs from 'fs'; */

const puppeteer = require('puppeteer');
//import fetch from 'node-fetch';
const fs = require('fs');
const fetch = require('node-fetch');
const books = require('../bdfiles/books');
const verses = require('../bdfiles/verses');


async function robot() {

    let v = await verses.findAll({
        where: {
            bookAbbrev: "gn",
            chapterNumber: 1,
        }
    })

    async function processImage(v) {
        for (let item of v) {
            await getImage(item);
        }
    }

    processImage(v)

    /* 
            (async () => {
                const browser = await puppeteer.launch({ headless: true });
                const page = await browser.newPage();
                await page.goto('https://discord.com/channels/1077326214852776027/1077326214852776030');
                await page.waitForTimeout(15000);
                await page.type('[name=email]', "julioramos.esporte@gmail.com")
                await page.type('[name=password]', "Ju7Li8o9")
                await page.keyboard.press('Enter');
    
    
    
    
                await page.waitForTimeout(10000);
                await page.type('div[data-slate-node="element"]', '/imagine');
                await page.waitForTimeout(3000);
                await page.keyboard.press('Tab');
                await page.keyboard.type('Assim serviu Jacó sete anos por Raquel; e estes lhe pareceram como poucos dias, pelo muito que a amava.');
                await page.keyboard.press('Enter');
                await page.waitForTimeout(60000);
    
                let messages = await page.$$('li.messageListItem-ZZ7v6g');
                const lastMessage = messages[messages.length - 1];
                const button = await lastMessage.$('button');
                await button.click();
                await page.waitForTimeout(60000);
    
                await page.goto('https://discord.com/channels/1077326214852776027/1077326214852776030');
                await page.waitForTimeout(15000);
    
    
                let messagesAgain = await page.$$('li.messageListItem-ZZ7v6g');
                let lastMessageAgain = messagesAgain[messagesAgain.length - 1];
    
                const imageSrcList = await lastMessageAgain.$$eval('img', imgElements => imgElements.map(img => img.src));
                //console.log(imageSrcList);
                let splitImage = imageSrcList[2].split('?')
                let linkImage = splitImage[0];
                console.log(linkImage);
    
                //const imageUrl = 'https://example.com/image.jpg';
                const imagePath = `./images/teste.png`;
                downloadImage(linkImage, imagePath);
    
    
    
    
    
    
                //await page.screenshot({ path: 'screenshot.png' });
                await browser.close();
            })(); */


    async function downloadImage(url, path) {
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFile(path, buffer, () => console.log('Imagem salva com sucesso!'));
    }

    async function getImage(v) {

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://discord.com/channels/1077326214852776027/1077326214852776030');
        await page.waitForTimeout(15000);
        await page.type('[name=email]', "julioramos.esporte@gmail.com")
        await page.type('[name=password]', "Ju7Li8o9")
        await page.keyboard.press('Enter');

        await page.waitForTimeout(10000);
        await page.type('div[data-slate-node="element"]', '/imagine');
        await page.waitForTimeout(3000);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(1000);
        await page.keyboard.type(v.verse);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(60000);

        let messages = await page.$$('li.messageListItem-ZZ7v6g');
        const lastMessage = messages[messages.length - 1];
        const button = await lastMessage.$('button');
        await button.click();
        await page.waitForTimeout(60000);

        await page.goto('https://discord.com/channels/1077326214852776027/1077326214852776030');
        await page.waitForTimeout(15000);


        let messagesAgain = await page.$$('li.messageListItem-ZZ7v6g');
        let lastMessageAgain = messagesAgain[messagesAgain.length - 1];

        const imageSrcList = await lastMessageAgain.$$eval('img', imgElements => imgElements.map(img => img.src));
        //console.log(imageSrcList);
        let splitImage = imageSrcList[2].split('?')
        let linkImage = splitImage[0];
        console.log(linkImage);

        //const imageUrl = 'https://example.com/image.jpg';
        const imagePath = `./images/${v.book}-${v.chapter}-${v.verse}_${v.idVerse}.png`;
        downloadImage(linkImage, imagePath);
        await browser.close();

    }

}

module.exports = robot
