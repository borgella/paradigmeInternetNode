"use strict"

var environnement = require('../../configuration/environnement');
var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var util = require('../../service/util');
var userDaoImpl = require('../model/userDaoImpl');
const s3Bucket = require('../../service/amazon');

router.post('/upload', uploadToAmazon, getUrlObject, function(req, res, next) {
    res.status(201)
        .send(response.responseJson(true, 'upload', null, hateoas.link('home',{})));
});


function uploadToAmazon(req, res, next){
    // i do not pass the req object because it contains too much data.
    var data = { Key: req.files.file.name, Body: req.files.file.path }; // pour l'appelle au serveur; key = file and value = le fichier elle meme
    s3Bucket.putAmazonObject(data, function(error, response){
        if(error)
            next(new Error('can\'t resolve this thing yet'));
        else
            next();
    });
}


function getUrlObject(req, res, next){
    s3Bucket.getAmazonObjectUrl(req.files.file.name, function(error, objectUrl){
        if(error)
            next(new Error('objectUrl error'));
        else{
            console.log(objectUrl);
            next();
        }
    });
}

module.exports = router;
