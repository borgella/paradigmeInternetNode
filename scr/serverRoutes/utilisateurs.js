"use strict"

var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var util = require('../../service/util');
var userDaoImpl = require('../model/userDaoImpl');

router.get('/fil/:_id', createUserFeed, function (req, res, next) {
    req.body.feed = {
        userTweets: req.body.dbUser.tweets.reverse(), subscibersTweets: req.body.tweetfeed.reverse(),
        userRetweets: req.body.dbUser.retweets.reverse(), subscribersRetweets: req.body.retweetfeed.reverse()
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

router.get('/abonnements/:_id', createUserFeedSubscribers, function (req, res, next) {
    res.status(200)
        .send(response.responseJson(true, req.body.subscribersfeed, null, hateoas.link('home', {})));
});

router.put('/abonnements/:_id/:_idsub', beforeSubscribeUser, function (req, res, next) {
    userDaoImpl.addSubscribers(req, function (error, dbUser) {
        if (dbUser) {
            userDaoImpl.findUserById(req.params._idsub, function (error, subscriber) {
                if (subscriber.followers.indexOf(util.stringToObectId(req.params._id)) === -1) {
                    userDaoImpl.addFollowers(req, function (error, subscriber) {
                        if (subscriber)
                            res.status(200)
                                .send(response.responseJson(true, req.body.subscriber, null, hateoas.link("home", {})));
                        else next(new Error('something went wrong with the database, sorry comeback later'));
                    });
                } else {
                    res.status(200)
                        .send(response.responseJson(true, req.body.subscriber, null, hateoas.link("home", {})));
                }
            });
        } else next(new Error('something went wrong with the database, sorry comeback later'));
    });
});

router.delete('/abonnements/:_id/:_idsub', beforeDeleteUser, function (req, res, next) {
    res.status(200)
        .send(response.responseJson(true, req.body.subscribers, null, hateoas.link("home", {})));
});

router.get('/suggestions/:_id', function (req, res, next) {
    //il faudrait créer un index pour plus de performance pour la recherche des suggestions.
    userDaoImpl.allAppUsers(req, function (error, appusers) {
        if (appusers) {
            var suggestions = [];
            if (appusers.length) {
                appusers.forEach(function(user){
                    if(user.followers.indexOf(req.params._id) === -1)
                        suggestions.push(user);
                        next();
                });
                res.status(200)
                    .send(response.responseJson(true, suggestions, null,  hateoas.link("home", {})));
            }

        } else next(new Error('database has no users...'));
    })
});

function createUserFeed(req, res, next) {
    userDaoImpl.isUserHasAnAccount(req, function (error, dbUser) {
        if (dbUser) {
            req.body.dbUser = dbUser;
            req.body.tweetfeed = [];
            req.body.retweetfeed = [];
            if (dbUser.subscribers.length) {
                dbUser.subscribers.forEach(function (subscriber) {
                    userDaoImpl.findUserById(subscriber, function (error, user) {
                        req.body.tweetfeed.push(user.tweets.reverse());
                        req.body.retweetfeed.push(user.retweets.reverse());
                        next(); // tres important car ca permet d eviter un UNDEFINED pour l objet req.body.tweetfeed
                    })
                });
            } else next();

        } else next(new Error('user does not exist'));
    });
}

function createUserFeedSubscribers(req, res, next) {
    userDaoImpl.isUserHasAnAccount(req, function (error, dbUser) {
        if (dbUser) {
            req.body.subscribersfeed = [];
            if (dbUser.subscribers.length) {
                dbUser.subscribers.forEach(function (subscriber) {
                    userDaoImpl.findUserById(subscriber, function (error, user) {
                        req.body.subscribersfeed.push(user);
                        next(); // tres important car ca permet d eviter un UNDEFINED pour l objet req.body.feed
                    });
                });
            } else next();
        } else next(new Error(' user does not exist'));
    });
}

function beforeSubscribeUser(req, res, next) {
    userDaoImpl.isUserHasAnAccount(req, function (error, dbUser) {
        if (dbUser) {
            if (dbUser.subscribers.indexOf(util.stringToObectId(req.params._idsub)) === -1) {
                userDaoImpl.findUserById(req.params._idsub, function (error, subscriber) {
                    if (subscriber) {
                        req.body.subscriber = subscriber;
                        next();
                    } else next(new Error('User does not exist '));
                });
            } else next(new Error('you are already subscribe to this user'));

        } else next(new Error('user does not exist'));
    });
}

function beforeDeleteUser(req, res, next) {
    userDaoImpl.isUserHasAnAccount(req, function (error, dbUser) {
        if (dbUser) {
            if (dbUser.subscribers.indexOf(util.stringToObectId(req.params._idsub)) >= 0) {
                userDaoImpl.unsubscribeUser(req, function (error, dbUser) {
                    req.body.subscribers = dbUser.subscribers;
                    next();
                });
            } else next(new Error(' you can not delete this user, you are not his followers '));

        } else next(new Error('user does not exist'));
    });
}

module.exports = router;