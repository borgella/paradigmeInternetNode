"use strict"
var environnement = require('../configuration/environnement');
process.env.AWS_ACCESS_KEY_ID = environnement.accessKeyId;
process.env.AWS_SECRET_ACCESS_KEY = environnement.secretAccessKey;

var AWS = require('aws-sdk');
var s3 = new AWS.S3();
const bucketName = 'brealborgella';
var sBucket = new AWS.S3( { params: {Bucket: bucketName} } );;

s3.createBucket({Bucket: bucketName}, function(error,data){
    if(error)
        return;
});

module.exports.putAmazonObject = function (data, callback){
    var params = { Key: data.Key, Body: data.Body };
    sBucket.putObject(params, function(error, datas){
        if(error){
            return callback(error, null);
        }else {
            return callback(null, datas);
        }
    });
}

module.exports.getAmazonObjectUrl = function(filename, callback){
    var urlParams = { Bucket: bucketName, Key: filename };
    sBucket.getSignedUrl('getObject', urlParams, function(error, objectUrl){
        if(error){
            return callback(error, null);
        }else{
            return callback(null, objectUrl);
        }
    });

}

var s3Bucket = sBucket;

module.exports.s3Bucket = s3Bucket;




