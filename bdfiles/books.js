const Sequelize = require('sequelize');
const database = require('../db');

const BibleBooks = database.define('bibleBooks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    abbrevPt: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    abbrevEn: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    author: Sequelize.STRING,
    chapters: Sequelize.STRING,
    group: Sequelize.STRING,
    name: Sequelize.STRING,
    testament: Sequelize.STRING,


})

module.exports = BibleBooks;