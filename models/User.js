const db = require('../config/db');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const User = db.define('users', {
    user_id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    username : {
        type : Sequelize.STRING,
        unique: {
            args: true,
            msg: 'Username already taken!'
        },
    },
    password : Sequelize.STRING
},{
    timestamps: false,
      hooks: {
        beforeValidate: hashPassword
      }
});

function hashPassword(user) {
    if (user.changed('password')) {
        return bcrypt.hash(user.password, 10).then(function (password) {
        user.password = password;
        });
    }
}

module.exports = User;