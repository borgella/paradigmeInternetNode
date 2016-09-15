"use strict"

var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var util = require('../../service/util');
var userDaoImpl = require('../model/userDaoImpl');

router.get('/fil', getFil, function (req, res, next) {
    res.status(200)
        .send(response.responseJson(true, "Utilisateur requests", hateoas.link("home", {})));
});

router.post('/tweets', postTweet, function (req, res, next) {
    res.status(200)
        .send(response.responseJson(true, req.body.tweet, hateoas.link("home", {})));
});

function getFil(req, res, next) {
    userDaoImpl.findUserById(req, function (dbUser) {
        if (dbUser) {
            next();
        } else next(new Error('user do not exist'));
    });

}

function postTweet(req, res, next) {
    req.body.tweet = { date: new Date(), tweet: req.body.tweet };
    userDaoImpl.postTweet(req, function (dbUser) {
        if (dbUser) {
            next();
        } else next(new Error('user do not exist post'));
    });
}

module.exports = router;