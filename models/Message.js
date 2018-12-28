const db = require('../config/db');
const Sequelize = require('sequelize');

const Message = db.define('messages', {
    id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    user_id : Sequelize.INTEGER,
    content_message : Sequelize.STRING
},{
    timestamps: false
});

module.exports = Message;