let Sequelize = require('sequelize');
let sequelize = new Sequelize('bible', 'root', '', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;