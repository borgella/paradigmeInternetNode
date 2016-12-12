"use strict"

var stringify = require('json-stringify');
var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var util = require('../../service/util');
var User = require('../model/user');
var userDaoImpl = require('../model/userDaoImpl');


router.post('/signup', beforeSignup, saveUser, function (req, res, next) {
    userDaoImpl.saveImage(req, function(error, dbuser){ // ici la bd renvoit l'utilisateur sans la derniere modif ajoutée'
        if(dbuser){
            userDaoImpl.findUserByEmail(dbuser.email, function(error, user){ // pour avoir l'utilisateur avec la modif apporte'
                 res.status(201)
                .send(response.responseJson(true, util.castUser(user), req.body.id_token, hateoas.link("signup", {})));
            });
        } else
            next(new Error('something went wront with the database.'));
    });
});

function beforeSignup(req, res, next) {
    if ((stringify(req.body)) != "{}") {
        req.body = new User(req.body);
        req.body.validate(function (error) {
            if (error) {
                next(error);
            } else {
                util.generateToken(req.body.email, function (error, tokens) {
                    if (tokens) {;
                        req.body.id_token = tokens;
                        next();
                    } else next(new Error('Can not generate the tokens'));
                });
            }
        });
    } else next(new Error("The body is empty. Enter informations to signup."));
}

function saveUser(req, res, next) {
    util.generateSaltHash(req.body.password, function (error, hash) {
        if (hash) {
            req.body.password = hash;
            userDaoImpl.saveInDataBase(req, res, next);
        } else next(new Error('we could not hash the password.'));
    });

}

module.exports = router;