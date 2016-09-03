"use strict"

var stringify = require('json-stringify');
var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var bcrypt = require('bcrypt');
var util = require('../../service/util');
var User = require('../model/user');
var userDaoImpl = require('../model/userDaoImpl');

router.post('/signup',beforeSignup,saveUser,function(req,res,next){
    res.status(200)
    .send(response.responseJson(true,"Congrulations your account have been created.",hateoas.link("signup",{})));
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
             userDaoImpl.saveInDataBase(req,res,next);
             
        }else next(new Error('we could not hash the password.'));
    });

}

module.exports = router;