"use strict"

var bcrypt = require('bcrypt');
var environnement = require("../configuration/environnement");
var jwt = require('jsonwebtoken');

module.exports.generateSaltHash = function(value,callback){
    bcrypt.hash(value, 10, function(err, hash) {   
        if(err)
            return callback(null);
        else
            return callback(hash);
    });
}

module.exports.compareHash = function(value, hash, callback){
    bcrypt.compare(value, hash, function(error, response) {
        if(error)
            return callback(false);
        else
            return callback(response);
    });
}

module.exports.generateToken = function(payload,callback){
    jwt.sign({last_name: payload},environnement.SECRET,{expiresIn: 86400},function(error,jwt){
        if(error)
            return callback(false);
        else
            return callback(jwt);
    });
}

module.exports.decodeToken = function(token,callback){
    jwt.verify(token,environnement.SECRET,function(error,decoded){
        if(error)
            return callback(false);
        else 
            return callback(decoded.last_name);   
    }); 
}