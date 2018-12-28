
const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Register
router.post('/register', function(req,res){
    User.create(req.body).then(user=>{
        res.json({
            message: 'success',
            data : user
        },200);
    }).catch(err => {
        res.json({
            message: 'User already taken!',
            data : err
        },403);
    })
});

//Login
router.post('/login', function(req,res){
    let user = req.body.username;
    let pass = req.body.password;
    User.findOne({
        where : {username: user}
    }).then(result => {
        if(!result){
            res.json({
                message : 'Authentication Failed!'
            },404)
        } else {
            bcrypt.compare(pass, result.password, (err,isMatch) => {
               if(!isMatch) res.json({ message: 'Wrong Password!' },403);
               else {
                   var token = jwt.sign({
                       username : user
                   },'inipasstokenrahasia', {expiresIn: "10h"});
                   return res.json({message: 'success',token: token},200);
               }
            })
        }
    }).catch(err => {
        res.json({
            message : 'Error: ' + err
        },500);
    });
});


module.exports = router ;
