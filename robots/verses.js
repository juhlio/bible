const axios = require('axios');
const books = require('../bdfiles/books');
const verses = require('../bdfiles/verses');

async function robot() {

    async function getVerses() {

        //buscando todos os livros da biblia no banco de dados
        let b = await books.findAll();
        let i = 0
        let t = b.length
        console.log(b)
        //loop para os livros da biblia
        while (i < t) {

            //loop para os capitulos do livro
            let tc = parseInt(b[i].chapters)
            let ic = 1
            console.log(typeof tc)

            while (ic < tc) {

                let lb = b[i].abbrevPt

                let res3 = await axios.get(`https://www.abibliadigital.com.br/api/verses/acf/${lb}/${ic}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRodSBGZWIgMTYgMjAyMyAxMzoyNjoyOCBHTVQrMDAwMC5qdWxpb3JhbW9zLmVzcG9ydGVAZ21haWwuY29tIiwiaWF0IjoxNjc2NTUzOTg4fQ.FRY5EHQxhmagki9e9EH4DoR4HUBRs0S8pEshjH10cq0'
                        }
                    })



                let l = res3.data
                //loop dos versos do capitulo
                let versos = l.verses
                let iv = 0
                let tv = versos.length

                while (iv < tv) {
                    await verses.create({
                        bookAbbrev: lb,
                        chapterNumber: ic,
                        totalVerses: l.chapter.verses,
                        verseNumber: l.verses[iv].number,
                        verse: l.verses[iv].text
                    })
                    iv++
                }
                //createVerse(l) 
                //console.log(l)
                ic++
            }
            i++
        }


    }

    getVerses()

}

module.exports = robot