const Sequelize = require('sequelize');
const database = require('./db');

const BibleVersions = database.define('versionsLanguages', {
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
    script: Sequelize.STRING,
    scriptDirection: Sequelize.STRING,
    
})

module.exports = BibleVersions;