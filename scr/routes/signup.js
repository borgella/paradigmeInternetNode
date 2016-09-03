"use strict"

var stringify = require('json-stringify');
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
    if((stringify(req.body))!= "{}"){
          req.body = new User(req.body);
          req.body.validate(function(error){
              if(error){
                  console.log(error.errors);
                  console.log('Validation failed...!');
                  next(error);
              }else{
                  next();
              }
          });
    }else next(new Error("The body is empty. Enter informations to signup."));
}

function saveUser(req,res,next){
    util.generateSaltHash(req.body.password,function(hash){
        if(hash){
             req.body.password = hash;
             req.body.save(function(error){
                    if(error){
                        res.status(404);
                         if(error.code === 11000)
                            next(new Error('This address email is already taking.'));
                         else
                            next(new Error('Database error connection, the document couldn t be save.'));
                     }else next();
              });
        }else next(new Error('we could not hash the password.'));
    });

}

module.exports = router;