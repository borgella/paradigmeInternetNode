"usestrict"

var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var util = require('../../service/util');
var userDaoImpl = require('../model/userDaoImpl');
var environnement = require('../../configuration/environnement');
var Formidable = require('formidable');

var AWS = require('aws-sdk');

router.post('/upload', formidableReading, function(req, res, next) {
    res.status(201)
        .send(response.responseJson(true, 'upload', null, hateoas.link('home',{})));
});


function formidableReading(req, res, next){
    var formidable = new Formidable.IncomingForm();
    formidable.parse(req, function(error, fields, file){
        if(error){
            next(new Error('file does not exists'))
        }else {
            console.log(fields);
            console.log(file);
            next();
        }
    });

}

module.exports = router;