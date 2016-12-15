"use strict"

var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var util = require('../../service/util');
var userDaoImpl = require('../model/userDaoImpl');

router.get('/fil/:_id', createUserFeedSubscribers, function (req, res, next) {
    req.body.feed = {
        userTweets: req.body.dbUser.tweets, subscibersTweets: req.body.tweetfeed,
        userRetweets: req.body.dbUser.retweets, subscribersRetweets: req.body.retweetfeed
    };
    res.status(200)
        .send(response.responseJson(true, req.body.feed, null, hateoas.link("home", {})));
});

router.post('/tweet/:_id', function (req, res, next) {
    if (req.body.text.length <= 140) {
        userDaoImpl.postTweet(req, function (error, dbUser) {
            if (dbUser) {
                res.status(200)
                    .send(response.responseJson(true, req.body.tweet, null, hateoas.link("home", {})));
            } else next(new Error('user do not exist post'));
        });
    } else next(new Error('The length of your tweet should be less or equal to 140 characters.'));
});

router.get('/tweets/:_id', function (req, res, next) {
    userDaoImpl.getTweets(req, function (error, dbUser) {
        if (dbUser) {
            res.status(200)
                .send(response.responseJson(true, null, null, hateoas.link("home", {})));
        } else next(new Error('user does not exist'));
    });
});

router.delete('/tweet/:_id/:_idtweet', function (req, res, next) {
    userDaoImpl.deleteTweet(req, function (error, dbUser) {
        if (dbUser) {
            res.status(200)
                .send(response.responseJson(true, null, null, hateoas.link("home", {})));
        } else next(new Error('user does not exist'));
    });
});

router.get('/retweets/:_id', function (req, res, next) {
    userDaoImpl.isUserHasAnAccount(req, function (error, dbUser) {
        if (dbUser) {
            req.body.retweets = dbUser.retweets;
            res.status(200)
                .send(response.responseJson(true, req.body.retweets, null, hateoas.link('home', {})));
        } else next(new Error('user does not exist'));
    })
});

router.put('/retweet/:_id', function (req, res, next) {
    userDaoImpl.putRetweet(req, function (error, dbUser) {
        if (dbUser) {
            res.status(200)
                .send(response.responseJson(true, req.body.retweet, null, hateoas.link('home', {})));
        } else next(new Error('user does not exist'));
    });
});

router.delete('/retweet/:_id/:_idretweet', function (req, res, next) {
    userDaoImpl.deleteRetweet(req, function (error, dbUser) {
        if (dbUser) {
            req.body.retweets = dbUser.retweets;
            res.status(200)
                .send(response.responseJson(true, req.body.retweets, null, hateoas.link('home', {})));
        } else next(new Error('user does not exist.'));
    });
});

router.get('/abonnements/:_id', createUserFeed, function (req, res, next) {
    res.status(200)
        .send(response.responseJson(true, req.body.subscribers, null, hateoas.link('home', {})));
});

router.put('/abonnements/:_id/:_idsub', beforeSubscribeUser, addFollower, function (req, res, next) {
    userDaoImpl.addSubscribers(req, function (error, dbUser) {
        if (dbUser) {
            res.status(200)
                .send(response.responseJson(true, req.body.subscriber, null, hateoas.link("home", {})));
        } else next(new Error('something went wrong with the database, sorry comeback later'));
    });
});

router.delete('/abonnements/:_id/:_idsub', beforeDeleteUser,deleteFollower, function (req, res, next) {
    res.status(200)
        .send(response.responseJson(true, req.body.subscribers, null, hateoas.link("home", {})));
});

router.get('/followers/:_id', getAllFollowers, function(req, res, next){
    res.status(200)
        .send(response.responseJson(true, req.body.followers, null, hateoas.link("home",{})));
});

router.get('/suggestions/:_id', suggest, function (req, res, next) {
    res.status(200)
        .send(response.responseJson(true, req.body.suggestions, null, hateoas.link("home", {})));
});

            /*******************    MiddleWare   ********************/
function createUserFeedSubscribers(req, res, next) {
    userDaoImpl.isUserHasAnAccount(req, function (error, dbUser) {
        if (dbUser) {
            req.body.dbUser = dbUser;
            req.body.tweetfeed = [];
            req.body.retweetfeed = [];
            if (dbUser.subscribers.length) {
                userDaoImpl.findSubscribers(req, function (error, subscribers) {
                    subscribers.forEach(function (subscriber) {
                        req.body.tweetfeed.push(subscriber.tweets);
                        req.body.retweetfeed.push(subscriber.retweets);
                    });
                    next();
                });
            } else next();

        } else next(new Error('user does not exist'));
    });
}

function createUserFeed(req, res, next) {
    userDaoImpl.isUserHasAnAccount(req, function (error, dbUser) {
        if (dbUser) {
            req.body.subscribers = [];
            if (dbUser.subscribers.length) {
                userDaoImpl.findSubscribers(req, function (error, subscribers) {
                    subscribers.forEach(function (subscriber) {
                        req.body.subscribers.push(util.castUser(subscriber));
                    });
                    next();
                });
            } else next();

        } else next(new Error('user does not exist'));
    });
}

function beforeSubscribeUser(req, res, next) {
    userDaoImpl.isUserHasAnAccount(req, function (error, dbUser) {
        if (dbUser) {
            if (dbUser.subscribers.indexOf(util.stringToObjectId(req.params._idsub)) === -1) {
                userDaoImpl.findUserById(req.params._idsub, function (error, subscriber) {
                    if (subscriber) {
                        req.body.subscriber = util.castUser(subscriber);
                        next();
                    } else next(new Error('User does not exist '));
                });
            } else next(new Error('you are already subscribe to this user'));

        } else next(new Error('user does not exist'));
    });
}

function addFollower(req, res, next) {
    userDaoImpl.findUserById(req.params._idsub, function (error, subscriber) {
        if (subscriber.followers.indexOf(util.stringToObjectId(req.params._id)) === -1) {
            userDaoImpl.addFollowers(req, function (error, subscriber) {
                if (subscriber)
                    next();
                else next(new Error('something went wrong with the database, sorry comeback later'));
            });
        } else next();
    });
}

function deleteFollower(req, res, next){
    userDaoImpl.findUserById(req.params._idsub, function(error, user){
        if(user.followers.indexOf(util.stringToObjectId(req.params._id)) >= 0){
            userDaoImpl.deleteFollower(req, function(error, subscriber){
                if(subscriber)
                    next();
                else next(new Error('something went wront with the database'));
            });
        }else next( new Error('you are no longer in this user followers list'));

    });
}

function beforeDeleteUser(req, res, next) {
    userDaoImpl.isUserHasAnAccount(req, function (error, dbUser) {
        if (dbUser) {
            if (dbUser.subscribers.indexOf(util.stringToObjectId(req.params._idsub)) >= 0) {
                userDaoImpl.unsubscribeUser(req, function (error, user) {
                    req.body.subscribers = user.subscribers;
                    next();
                });
            } else next(new Error(' you can not delete this user, you are not his followers '));

        } else next(new Error('user does not exist'));
    });
}

function getAllFollowers(req, res, next){
    userDaoImpl.isUserHasAnAccount(req, function(error, dbUser){
        if(dbUser){
            req.body.followers = [];
            userDaoImpl.getAllFollowers(req, function(error, followers){
                if(followers){
                     followers.forEach(function(follower){
                            req.body.followers.push(util.castUser(follower));
                      });
                     next();
                }else next(new Error('you have no followers'));
            });
        }else next(new Error('you do not have an account'));
    });
}

function suggest(req, res, next) {
    userDaoImpl.isUserHasAnAccount(req, function (error, dbUser) {
        if (dbUser) {
            req.body.suggestions = [];
            userDaoImpl.allAppUsers(req, function (error, appusers) {
                if (appusers) {
                    appusers.forEach(function (user) {
                        req.body.suggestions.push(util.castUser(user));
                    });
                    next();
                } else next(new Error('database has no users...'));
            });

        }
    });

}

module.exports = router;