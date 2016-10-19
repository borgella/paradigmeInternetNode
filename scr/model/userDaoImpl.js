"use strict"
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;
var User = require('../model/user');

module.exports.saveInDataBase = function (req, res, next) {
    req.body.save(function (err) {
        if (err) {
            res.status(404);
            if (err.code === 11000)
                next(new Error('This address email is already taking.'));
            else
                next(new Error('Database error connection, the document could not be save.'));
        } else next();

    });
}

module.exports.findUserByEmail = function (_email, callback) {
    User.findOne({ email: _email }, function (err, dbUser) {
        if (err)
            return callback(err, null);
        else
            return callback(null, dbUser);
    });
}

module.exports.findUserById = function (_id, callback) {
    User.findOne({ _id: stringToObectId(_id) }, function (err, dbUser) {
        if (err)
            return callback(err, null);
        else
            return callback(null, dbUser);
    });

}

module.exports.postTweet = function (req, callback) {
    req.body.tweet = { _id: generateMongooseId(), date: new Date(), tweet: req.body.text };
    User.findOneAndUpdate({ _id: stringToObectId(req.headers._id) },
        { $push: { tweets: req.body.tweet } },
        function (err, dbUser) {
            if (err)
                return callback(err, null);
            else
                return callback(null, dbUser);
        });
}

module.exports.getTweets = function (req, callback) {
    User.findOne({ _id: stringToObectId(req.headers._id) }, function (err, dbUser) {
        if (err)
            return callback(err, null);
        else
            return callback(null, dbUser.tweets.reverse());
    });
}

module.exports.deleteTweet = function (req, callback) {
    User.findOneAndUpdate({ _id: stringToObectId(req.headers._id) },
        { $pull: { tweets: { _id: stringToObectId(req.headers._idtweet) } } },
        function (err, dbUser) {
            if (err)
                return callback(err, null);
            else
                return callback(null, dbUser.tweets);
            });
}

module.exports.addSubscribers = function(req, callback){
    User.findOneAndUpdate({ _id: stringToObectId(req.headers._id) },
        { $push: { subscribers: stringToObectId(req.headers._idsub) } },
        function (err, dbUser) {
            if (err)
                return callback(err, null);
            else
                return callback(null, dbUser);
        });
}

module.exports.addFollowers = function(req, callback){
    User.findOneAndUpdate({_id: stringToObectId(req.headers._idsub) }, 
     {$push: { followers: stringToObectId(req.headers._id) } },  
         function(err, dbUser){
              if(err)
                  return callback(err, null);
              else
                  return callback(null, dbUser);
     });
}

module.exports.deleteSubscriber = function(req, callback){
    User.findOneAndUpdate({_id: stringToObectId(req.headers._idsub)},
    {$pull: {followers: stringToObectId(req.headers._id) } }, 
    function(err, dbUser){
        if(err)
            return callback(err, null);
        else
            return callback(null, dbUser.followers);
    });
}

module.exports.unsubscribeUser = function(req, callback){
    User.findOneAndUpdate({_id: stringToObectId(req.headers._id) }, 
    {$pull: {subscribers : stringToObectId(req.headers._idsub) } },
    function(err, dbUser){
        if(err)
            return callback(err, null);
        else
            return callback(null, dbUser.subscribers);
    });
}



module.exports.isUserSubscribeYet = function(req, callback){
    User.findOne({_id: stringToObectId(req.headers._id) }, function(err, dbUser){
       if(err)
          return callback(err, null);
       else           
          return callback(null, dbUser.subscribers.indexOf(stringToObectId(req.headers._idsub)));
    });
    
}

function stringToObectId(a_string) {
    return new mongoose.mongo.ObjectId(a_string);
}

function generateMongooseId() {
    return mongoose.Types.ObjectId();
}

