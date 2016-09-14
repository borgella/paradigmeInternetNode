"use strict"

var environnement = require('./environnement');
var mongoose = require('mongoose');
var hateoas = require('../service/hateoas');
var response = require('../scr/views/responseJson');

module.exports.getDataBaseConnection = function(req, res, next){
    if(mongoose.connection.readyState === 1){
        next();
        return;
    }else{
        mongoose.connect(environnement.DATABASE_URL, function(err){
            if(err){
                res.status(400)
                .send(response.responseJson(false, "Something went wrong,cant connect to the database...!", hateoas.link("home", {})));
                next();
            }else{
                console.log("Sucessfuly connected to " + environnement.DATABASE_URL + "...!");
                next();
            }
        })
    }
} 