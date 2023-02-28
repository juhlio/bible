const Sequelize = require('sequelize');
const database = require('../db');

const audios = database.define('audios', {
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
    audioFile: Sequelize.STRING,



})

module.exports = audios;