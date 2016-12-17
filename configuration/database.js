"use strict"

var environnement = require('./environnement');
var mongoose = require('mongoose');
var hateoas = require('../service/hateoas');
var response = require('../scr/views/responseJson');

module.exports.getDataBaseConnection = function(req, res, next){
    if(mongoose.connection.readyState === 1){
         return next();
    }else{
        mongoose.connect(environnement.DATABASE_URL, function(error){
            if(error){
                next(new Error("Something went wrong, can't connect to the database...!"));
            }else{
                console.log("Sucessfuly connected to " + environnement.DATABASE_URL + "...!");
                return next();
            }
        })
    }
} 