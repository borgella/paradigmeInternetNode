"use strict"

var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var util = require('../../service/util');
var userDaoImpl = require('../model/userDaoImpl');

router.get('/fil', function (req, res, next) {
    userDaoImpl.findUserById(req.headers._id, function (dbUser) {
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

router.put('/abonnements',beforeSubscribeUser, function(req, res, next){
    userDaoImpl.addSubscribers(req, function(dbUser){
        if(dbUser){
            userDaoImpl.addFollowers(req, function(subscriber){
                res.status(200)
                   .send(response.responseJson(true, req.body.subscriber, hateoas.link("home", {}))); 
            });     
        } else next(new Error('something went wrong with the database, sorry comeback later'));  
    });
});

router.delete('/abonnements', beforeDeleteUser, function(req, res, next){
    userDaoImpl.deleteSubscriber(req, function(followers){
        if(followers){
            res.status(200)
               .send(response.responseJson(true, req.body.subscribers, hateoas.link("home", {})));              
        }else next(new Error('something went wrong with the database, sorry comeback later'));  
    }); 
});

function beforeSubscribeUser(req, res, next){
    userDaoImpl.isUserSubscribeYet(req, function(value){
        if(value === -1){
            userDaoImpl.findUserById(req.headers._idsub, function(subscriber){
                if(subscriber){
                    req.body.subscriber = subscriber;
                    next();
                 }else next(new Error('subscriber does not exist '));
             }); 
        
        }else next(new Error('you are already subscribe to this user'));
    });
}

function beforeDeleteUser(req, res, next){
    userDaoImpl.isUserSubscribeYet(req, function(value){
        if(value >= 0){
            userDaoImpl.unsubscribeUser(req, function(subscribers){
                if(subscribers){
                    req.body.subscribers = subscribers;
                    next();
                
                } else next(new Error('something went wrong with the database, sorry comeback later'));  
            });
        }else next(new Error(' you can not delete this user, you are not his followers '));
    });
}

module.exports = router;