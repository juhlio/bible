const keywordExtractor = require("keyword-extractor");



async function robot() {

    const text = "E disse Deus: Produza a terra erva verde, erva que dê semente, árvore frutífera que dê fruto segundo a sua espécie, cuja semente está nela sobre a terra; e assim foi.";

    const extractedKeywords = keywordExtractor.extract(text, {
        language: "portuguese",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true
    });

    console.log(extractedKeywords);
}


module.exports = robot