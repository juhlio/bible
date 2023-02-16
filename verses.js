const Sequelize = require('sequelize');
const database = require('./db');

const bibleVerses = database.define('bibleVerses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    bookAbbrev: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    chapterNumber: Sequelize.INTEGER,
    totalVerses: Sequelize.INTEGER,
    verseNumber: Sequelize.INTEGER,
    verse: Sequelize.STRING,



})

module.exports = bibleVerses;