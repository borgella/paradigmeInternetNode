"use strict"
var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var util = require('../../service/util');
var userDaoImpl = require('../model/userDaoImpl');

router.post('/login',findTheUser,function(req,res,next){
    res.status(200)
    .send(response.responseJson(true,"Your are sucessfully connected...",hateoas.link("login" , {})));
});

router.get('/logout',function(req,res,next){
    res.status(200)
    .send(response.responseJson(true,"bye see you next",hateoas.link("logout",{})));
});


function findTheUser(req,res,next){
    userDaoImpl.findOneUser(req.body.email,function(user){
        if(user){
            util.compareHash(req.body.password,user.password,function(response){
                if(response)
                    next();
                else 
                    next(new Error("The password you entered did not match with our database."));
            });
        }
    });
}

module.exports = router;