"use strict"
var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var util = require('../../service/util');
var environnement = require('../../configuration/environnement');
var userDaoImpl = require('../model/userDaoImpl');
var jwt = require('jsonwebtoken');

router.post('/login', findTheUser, function (req, res, next) {
    res.status(200)
        .send(response.responseJson(true, util.castUser(req.body.dbUser), req.body.id_token, hateoas.link("login", {})));
});

router.get('/logout', function (req, res, next) {
    res.status(200)
        .send(response.responseJson(true, "bye see you next time.", null, hateoas.link("logout", {})));
});


function findTheUser(req, res, next) {
    userDaoImpl.findUserByEmail(req.body.email, function (error, dbUser) {
        if (dbUser) {
            req.body.dbUser = dbUser;
            util.compareHash(req.body.password, dbUser.password, function (error, response) {
                if (response) {
                    util.generateToken(req.body.email, function (error, token) {
                        if(token){
                            req.body.id_token = token;
                            next();
                        } else next(new Error("server internal error."));
                    });
                } else next(new Error("The password you entered did not match with our database."));
            });
        } else next(new Error('You do not have an account yet, please sign up to have access.'));
    });
}

module.exports = router;