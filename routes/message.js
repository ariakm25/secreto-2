
const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const Message = require('../models/Message');
const User = require('../models/User');

router.post('/:user/submit', function(req,res){
    let user = req.params.user;
    User.findOne({ where : {
        username : user
    }}).then(result =>{
        Message.create({
            user_id : result.user_id,
            content_message : req.body.content_message
        }).then(result =>{
            res.json({
                message:'success',
                data : result
            },200);
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
});


//midlleware
var CheckQuery = (req, res, next) => {    
    if (!req.query.token) {
        return res.status(404).json({
            message: 'Token Undifined'
        })
    }
    return next();
}

var CheckToken = (req, res, next) => {
        var user = req.params.user;
        var decoded = jwt.verify(req.query.token, 'inipasstokenrahasia');
        User.findOne({ where : {
        username : user
    }}).then(result =>{
        if(result.username == decoded.username){
            Message.findAll({   where : {
                user_id : result.user_id,            
            }
            }).then(result =>{
                res.status(200).json({
                    message:'success',
                    data : result
                });
            }).catch(err => console.log(err));
        }else res.json({message:'Wrong user/token'},403)
    }).catch(err => console.log(err))
    
}

router.get('/:user/show', CheckQuery, CheckToken);

module.exports = router ;