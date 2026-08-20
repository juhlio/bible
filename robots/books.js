require('dotenv').config();
const axios = require('axios');
const books = require('../bdfiles/books');

async function robot() {

    async function getBooks() {

        let res3 = await axios.get('https://www.abibliadigital.com.br/api/books',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.BIBLE_API_TOKEN}`
                }
            })

        let l = res3.data
        l.forEach(createBook)
        console.log(l)

    }

    async function createBook(b) {

        const createBook = await books.create({
            abbrevPt: b.abbrev.pt,
            abbrevEn: b.abbrev.en,
            author: b.author,
            chapters: b.chapters,
            group: b.group,
            name: b.name,
            testament: b.testament,
        })
    }

    getBooks()

}

module.exports = robot
