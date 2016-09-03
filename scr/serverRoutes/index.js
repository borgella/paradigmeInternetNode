"use strict"
var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');

router.get('/',function(req,res,next){
    res.status(200);
    res.send(response.responseJson(true,"the home page",hateoas.link("home" , {})));
});

module.exports = router;