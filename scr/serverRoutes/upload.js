"usestrict"

var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var util = require('../../service/util');
var userDaoImpl = require('../model/userDaoImpl');
var environnement = require('../../configuration/environnement');
var fs = require("fs");

var AWS = require('aws-sdk');

//create bucketName for amazon and using package s3fs
var bucketName = 'borgelaws';
var AWSS3FS = require('s3fs');
var awsDaoImpl = new AWSS3FS(bucketName, { "accessKeyId": environnement.accessKeyId ,
                                           "secretAccessKey": environnement.secretAccessKey } );
awsDaoImpl.create();


router.post('/upload', formidableReading, function(req, res, next) {
    console.log(awsDaoImpl.getPath(req.files.file.name));
    awsDaoImpl.getPath(req.files.file.name, function(error,details){
        console.log(error);
        console.log(details);
    });
    res.status(201)
        .send(response.responseJson(true, 'upload', null, hateoas.link('home',{})));
});


function formidableReading(req, res, next){
   // pour l'appelle au serveur; key = file and value = le fichier elle meme
   var readStream = fs.createReadStream(req.files.file.path);
   awsDaoImpl.writeFile(req.files.file.name, readStream,function(error){
       if(error){
            console.error(error);
            next();
       } else{
            console.log('save');  
            next();
      }
   });
  
}


function getUrlAWS(req, res, next){
    
}
/*
    var AWS = require('aws-sdk');
    var s3 = new AWS.S3();
    //var bucketParams = {Bucket: 'myBucket'};
    //s3.createBucket(bucketParams)
    var s3Bucket = new AWS.S3( { params: {Bucket: bucketName} } );
    var data = {Key: req.files.file.name, Body: req.files.file.path)};
    s3Bucket.putObject(data, function(err, data){
     if (err) { 
         console.log('Error uploading data: ', data); 
     } else {
      console.log('succesfully uploaded the image!';
    }
});

var urlParams = {Bucket:bucketName, Key: req.files.file.name};
s3Bucket.getSignedUrl('getObject', urlParams, function(err, url){
  console.log('the url of the image is', url);
})
 */


module.exports = router;