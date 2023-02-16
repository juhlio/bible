const axios = require('axios');
const books = require('./books');
const verses = require('./verses');



(async () => {
    const database = require('./db');

    try {
        const resultado = await database.sync();
        //console.log(resultado);
    } catch (error) {
        //console.log(error);
    }
})();

/* newUser();
async function newUser() {

    var config = {
        method: 'post',
        url: `https://www.abibliadigital.com.br/api/users`,
        name: "Julio",
        email: "julioramos.esporte@gmail.com",
        password: "250133",
        notifications: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    let resposta = await axios.post('https://www.abibliadigital.com.br/api/users', config);
    console.log(resposta)
} */


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

    /* let res3 = await axios.get('https://www.abibliadigital.com.br/api/verses/acf/gn/2',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRodSBGZWIgMTYgMjAyMyAxMzoyNjoyOCBHTVQrMDAwMC5qdWxpb3JhbW9zLmVzcG9ydGVAZ21haWwuY29tIiwiaWF0IjoxNjc2NTUzOTg4fQ.FRY5EHQxhmagki9e9EH4DoR4HUBRs0S8pEshjH10cq0'
            }
        }) */
    /* 
        let l = res3.data
        createVerse(l) */
    //console.log(l)

}


async function getBooks() {

    let res3 = await axios.get('https://www.abibliadigital.com.br/api/books',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRodSBGZWIgMTYgMjAyMyAxMzoyNjoyOCBHTVQrMDAwMC5qdWxpb3JhbW9zLmVzcG9ydGVAZ21haWwuY29tIiwiaWF0IjoxNjc2NTUzOTg4fQ.FRY5EHQxhmagki9e9EH4DoR4HUBRs0S8pEshjH10cq0'
            }
        })

    let l = res3.data
    l.forEach(createBook)
    //console.log(l)

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

async function createVerse(v) {

    let versos = v.verses
    let i = 0
    let t = versos.length

    console.log(t)
    while (i < t) {
        await verses.create({
            bookAbbrev: 'gn',
            chapterNumber: 2,
            totalVerses: v.chapter.verses,
            verseNumber: v.verses[i].number,
            verse: v.verses[i].text
        })
        i++
    }


}

async function robots() {

    //await getBooks()
    await getVerses()

}

robots()




