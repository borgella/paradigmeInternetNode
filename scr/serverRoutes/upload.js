"usestrict"

var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var util = require('../../service/util');
var userDaoImpl = require('../model/userDaoImpl');
var environnement = require('../../configuration/environnement');

var AWS = require('aws-sdk');

router.post('/upload', uploadFile, function(req, res, next) {
    res.status(201)
        .send(response.responseJson(true, 'Upload file', null, hateoas.link('home',{})));
});

var keyName = 'hello_world.txt';

function uploadFile(req, res, next){
    var s3 = new AWS.S3();
    var thebucket = {Bucket:"borgellaaws"};
    
    s3.createBucket(thebucket, function() {
        var params = {Bucket: thebucket, Key: keyName, Body: 'Hello World!'};
        s3.putObject(params, function(err, data) {
            if (err){
            console.log(err);
            next();
            }else
            console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
            next();
        });
    });
}

module.exports = router;