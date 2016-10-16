"use strict"

var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var util = require('../../service/util');
var userDaoImpl = require('../model/userDaoImpl');

router.get('/fil', function (req, res, next) {
    userDaoImpl.findUserById(req, function (dbUser) {
        if (dbUser) {
            res.status(200)
               .send(response.responseJson(true, "Utilisateur requests", hateoas.link("home", {})));
        } else next(new Error('user does not exist'));
    });
});

router.post('/tweet', function (req, res, next) {
    if(req.body.text.length <= 140){
         userDaoImpl.postTweet(req, function (dbUser) {
            if (dbUser) {
                res.status(200)
                   .send(response.responseJson(true, req.body.tweet, hateoas.link("home", {})));
            } else next(new Error('user do not exist post'));
        });
    }else next (new Error('The length of your tweet should be less or equal to 140 characters.'));
});

router.get('/tweets', function(req, res, next){
    userDaoImpl.getTweets(req, function(tweets){
       if(tweets){
           req.body.tweets = tweets;
            res.status(200)
               .send(response.responseJson(true, req.body.tweets, hateoas.link("home", {})));
         }else next(new Error('user does not exist'));
   });
});

router.delete('/tweet', function(req, res, next){
    userDaoImpl.deleteTweet(req, function(tweets){
        if(tweets){
            req.body.tweets = tweets;
            res.status(200)
               .send(response.responseJson(true, req.body.tweets, hateoas.link("home", {})));
        }else next(new Error('user does not exist'))
    });
});

module.exports = router;