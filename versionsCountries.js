const Sequelize = require('sequelize');
const database = require('./db');

const BibleVersions = database.define('versionsCountries', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    versionId: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    name: Sequelize.STRING,
    nameLocal: Sequelize.STRING,
})

module.exports = BibleVersions;