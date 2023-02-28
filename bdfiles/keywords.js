const Sequelize = require('sequelize');
const database = require('../db');

const keywords = database.define('keywords', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idVerse: Sequelize.INTEGER,
    bookAbbrev: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    chapterNumber: Sequelize.INTEGER,
    verseNumber: Sequelize.INTEGER,
    ptKeys: Sequelize.STRING,
    enKeys: Sequelize.STRING,



})

module.exports = keywords;