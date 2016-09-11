"use strict"
var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var util = require('../../service/util');
var environnement = require('../../configuration/environnement');
var userDaoImpl = require('../model/userDaoImpl');
var jwt  = require('jsonwebtoken');

router.post('/login',findTheUser,function(req,res,next){
    res.status(200)
    .send(response.responseJson(true,req.body.token,hateoas.link("login" , {})));
});

router.get('/logout',function(req,res,next){
    res.status(200)
    .send(response.responseJson(true,"bye see you next time.",hateoas.link("logout",{})));
});


function findTheUser(req,res,next){
    console.log(req.headers['x-access-token']);
    userDaoImpl.findOneUser(req.body.email,function(user){
        if(user){
            util.compareHash(req.body.password,user.password,function(response){
                    if(response){
                          req.body = user;
                          util.generateToken(req.body.last_name,function(token){
                                req.body.token = token;
                                next(); 
                          });
                     }else next(new Error("The password you entered did not match with our database."));
            });
        }else next(new Error('You do not have an account yet, please sign up to have access.'));
    });
}

module.exports = router;