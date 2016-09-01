"use strict"

var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');

router.post('/signup',function(req,res,next){
    res.status(200)
    .send(response.responseJson(true,"the signup page",hateoas.link("signup",{})));
});

module.exports = router;