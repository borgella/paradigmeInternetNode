"use strict"

var bcrypt = require('bcrypt');
var environnement = require("../configuration/environnement");
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

module.exports.generateSaltHash = function (value, callback) {
    bcrypt.hash(value, 10, function (err, hash) {
        if (err)
            return callback(err, null);
        else
            return callback(null, hash);
    });
}

module.exports.compareHash = function (value, hash, callback) {
    bcrypt.compare(value, hash, function (error, response) {
        if (error)
            return callback(error, null);
        else
            return callback(null, response);
    });
}

module.exports.generateToken = function (payload, callback) {
    jwt.sign({ email: payload }, environnement.SECRET, { expiresIn: 86400 }, function (error, token) {
        if (error)
            return callback(error, null);
        else
            return callback(null, token);
    });
}

module.exports.decodeToken = function (token, callback) {
    jwt.verify(token, environnement.SECRET, function (error, decoded) {
        if (error)
            return callback(error);
        else
            return callback(decoded.email);
    });
}

module.exports.stringToObectId = function (a_string) {
    return new mongoose.mongo.ObjectId(a_string);
}

module.exports.generateMongooseId = function () {
    return mongoose.Types.ObjectId();
}

module.exports.User = function(user){
    return {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        tweets: user.tweets,
        retweets: user.retweets,
        subscribers: user.subscribers,
        followers: user.followers
    }
}

module.exports.reject = {
   tweets: 0, 
   retweets: 0, 
   email: 0, 
   password: 0, 
   subscribers: 0, 
   __v: 0
}