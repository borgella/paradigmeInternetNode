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

router.get('/tweet', function(req, res, next){
    res.status(200)
        .send(response.responseJson(true, "get a specific tweet", hateoas.link("home", {})));
});

router.delete('/tweet', function(req, res, next){
    console.log("the delete method");
    res.status(200)
        .send(response.responseJson(true, 'Delete Method', hateoas.link("home", {})));
})



function getFil(req, res, next) {
    userDaoImpl.findUserById(req, function (dbUser) {
        if (dbUser) {
            next();
        } else next(new Error('user do not exist'));
    });

}

function postTweet(req, res, next) {
    if(req.body.text.length <= 140){
         userDaoImpl.postTweet(req, function (dbUser) {
            if (dbUser) {
                next();
            } else next(new Error('user do not exist post'));
        });
    }else next (new Error('The length of your tweet should be less or equal to 140 characters.'));
}

module.exports = router;