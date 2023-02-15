const axios = require('axios');
const versions = require('./versions');



(async () => {
    const database = require('./db');

    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();


async function doPostRequest() {

    let res3 = await axios.get('https://api.scripture.api.bible/v1/bibles',
        {
            headers: {
                'api-key': 'ad29b519974afee5a969822c9a6d5703'
            }
        })


    let l = res3.data.data
    l.forEach(createVersion)
    console.log(l)

}

doPostRequest()

async function createVersion(l) {


    const resultadoCreateVersion = await versions.create({
        id: l.id,
        dblId: l.dblId,
        relatedDbl: l.relatedDbl,
        name: l.name,
        nameLocal: l.nameLocal,
        abbreviation: l.abbreviation,
        description: l.description,
        descriptionLocal: l.descriptionLocal,
        languageName: l.language.name,
        languageNameLocal: l.language.nameLocal,
        script: l.language.script,
        scriptDirection: l.language.scriptDirection,
        countryName: l.countries[0].name,
        countryNameLocal: l.countries[0].nameLocal
    }) 



}
