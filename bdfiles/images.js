const Sequelize = require('sequelize');
const database = require('../db');

const images = database.define('images', {
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
    imageFile: Sequelize.STRING,



})

module.exports = images;