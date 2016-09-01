"use strict"
var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.send("Welcome to a limit version of tweeter.");
});

module.exports = router;