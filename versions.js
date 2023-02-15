const Sequelize = require('sequelize');
const database = require('./db');

const BibleVersions = database.define('bibleVersions', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    dblId: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    relatedDbl: Sequelize.STRING,
    name: Sequelize.STRING,
    nameLocal: Sequelize.STRING,
    abbreviation: Sequelize.STRING,
    abbreviationLocal: Sequelize.STRING,
    description: Sequelize.STRING,
    languageName: Sequelize.STRING,
    languageNameLocal: Sequelize.STRING,
    script: Sequelize.STRING,
    scriptDirection: Sequelize.STRING,
    countryName: Sequelize.STRING,
    countryNameLocal: Sequelize.STRING,

})

module.exports = BibleVersions;