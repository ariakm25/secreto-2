const Sequelize = require('sequelize');

const sequelize = new Sequelize('secreto','root', '',{
    host : 'localhost',
    dialect : 'mysql'
});

module.exports = sequelize