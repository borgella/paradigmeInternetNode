"use strict"

var bcrypt = require('bcrypt');

module.exports.generateSaltHash = function(value,callback){
    bcrypt.hash(value, 10, function(err, hash) {   
        if(err)
            return callback(null);
        else
            return callback(hash);
    });
}

module.exports.compareHash = function(value, hash, callback){
    bcrypt.compare(value, hash, function(err, res) {
        if(err)
            return callback(null);
        else
            return callback(res);
    });
}