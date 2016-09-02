"use strict"
var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');

router.get('/login',function(req,res,next){
    res.status(200)
    .send(response.responseJson(true,"the login route",hateoas.link("login" , {})));
});

router.get('/logout',function(req,res,next){
    res.status(200)
    .send(response.responseJson(true,"the logout page",hateoas.link("logout",{})));
});


function compare(req,res,next){
    console.log(req.body);
    //util.compareHash(req.body.toto,req.password,function(response){
      //  console.log(response);
        //next();
    //});
    next();
}

module.exports = router;