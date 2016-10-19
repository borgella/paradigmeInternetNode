"use strict"
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;
var User = require('./user');
var util = require('../../service/util');

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
    User.findOne({ _id: util.stringToObectId(_id) }, function (err, dbUser) {
        if (err)
            return callback(err, null);
        else
            return callback(null, dbUser);
    });

}

module.exports.postTweet = function (req, callback) {
    req.body.tweet = { _id: util.generateMongooseId(), date: new Date(), tweet: req.body.text };
    User.findOneAndUpdate({ _id: util.stringToObectId(req.headers._id) },
        { $push: { tweets: req.body.tweet } },
        function (err, dbUser) {
            if (err)
                return callback(err, null);
            else
                return callback(null, dbUser);
        });
}

module.exports.getTweets = function (req, callback) {
    User.findOne({ _id: util.stringToObectId(req.headers._id) }, function (err, dbUser) {
        if (err)
            return callback(err, null);
        else
            return callback(null, dbUser);
    });
}

module.exports.deleteTweet = function (req, callback) {
    User.findOneAndUpdate({ _id: util.stringToObectId(req.headers._id) },
        { $pull: { tweets: { _id: util.stringToObectId(req.headers._idtweet) } } },
        function (err, dbUser) {
            if (err)
                return callback(err, null);
            else
                return callback(null, dbUser);
            });
}

module.exports.addSubscribers = function(req, callback){
    User.findOneAndUpdate({ _id: util.stringToObectId(req.headers._id) },
        { $push: { subscribers: util.stringToObectId(req.headers._idsub) } },
        function (err, dbUser) {
            if (err)
                return callback(err, null);
            else
                return callback(null, dbUser);
        });
}

module.exports.addFollowers = function(req, callback){
    User.findOneAndUpdate({_id: util.stringToObectId(req.headers._idsub) }, 
     {$push: { followers: util.stringToObectId(req.headers._id) } },  
         function(err, dbUser){
              if(err)
                  return callback(err, null);
              else
                  return callback(null, dbUser);
     });
}

module.exports.deleteSubscriber = function(req, callback){
    User.findOneAndUpdate({_id: util.stringToObectId(req.headers._idsub)},
    {$pull: {followers: util.stringToObectId(req.headers._id) } }, 
    function(err, dbUser){
        if(err)
            return callback(err, null);
        else
            return callback(null, dbUser);
    });
}

module.exports.unsubscribeUser = function(req, callback){
    User.findOneAndUpdate({_id: util.stringToObectId(req.headers._id) }, 
    {$pull: {subscribers : util.stringToObectId(req.headers._idsub) } },
    function(err, dbUser){
        if(err)
            return callback(err, null);
        else
            return callback(null, dbUser);
    });
}



module.exports.isUserHasAnAccount = function(req, callback){
    User.findOne({_id: util.stringToObectId(req.headers._id) }, function(err, dbUser){
       if(err)
          return callback(err, null);
       else           
          return callback(null, dbUser);
    });
    
}

