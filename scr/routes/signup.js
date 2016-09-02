"use strict"

var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var bcrypt = require('bcrypt');
var util = require('../../service/util');
var User = require('../model/user');

router.post('/signup',beforeSignup,saveUser,function(req,res,next){
    res.status(200)
    .send(response.responseJson(true,"the signup page",hateoas.link("signup",{})));
});

function beforeSignup(req,res,next){
    if(req.body){
          var user = new User(req.body);
          user.validate(function(error){
              if(error){
                  console.log(error.errors);
                  next(error);
              }else{
                  req.body = user;
                  next();
              }
          });
    }
}

function saveUser(req,res,next){
    util.generateSaltHash(req.body.password,function(hash){
        req.body.password = hash;
        req.body.save(function(error){
            if(error){
                console.log("can't connect to the Bd");
                console.log("we will create log files");
                next(error);
            }else{
                console.log(req.body);
            }
        });
        next();
    });

}

module.exports = router;