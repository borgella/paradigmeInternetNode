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
    User.findOne({ _id: util.stringToObjectId(_id) }, function (err, dbUser) {
        if (err)
            return callback(err, null);
        else
            return callback(null, dbUser);
    });

}

module.exports.postTweet = function (req, callback) {
    req.body.tweet = { _id: util.generateMongooseId(), date: new Date(), tweet: req.body.text };
    User.findOneAndUpdate({ _id: util.stringToObjectId(req.params._id) },
        { $push: { tweets: req.body.tweet } },
        function (err, dbUser) {
            if (err)
                return callback(err, null);
            else
                return callback(null, dbUser);
        });
}

module.exports.getTweets = function (req, callback) {
    User.findOne({ _id: util.stringToObjectId(req.params._id) }, function (err, dbUser) {
        if (err)
            return callback(err, null);
        else
            return callback(null, dbUser);
    });
}

module.exports.deleteTweet = function (req, callback) {
    User.findOneAndUpdate({ _id: util.stringToObjectId(req.params._id) },
        { $pull: { tweets: { _id: util.stringToObjectId(req.params._idtweet) } } },
        function (err, dbUser) {
            if (err)
                return callback(err, null);
            else
                return callback(null, dbUser);
        });
}

module.exports.putRetweet = function (req, callback) {
    //always create an object with req.body.data before to save it in the Database
    req.body.retweet = { _id: util.generateMongooseId(), date: req.body.retweet.date, tweet: req.body.retweet.tweet };
    User.findOneAndUpdate({ _id: util.stringToObjectId(req.params._id) },
        { $push: { retweets: req.body.retweet } },
        function (err, dbUser) {
            if (err)
                return callback(err, null);
            else
                return callback(null, dbUser);

        });
}

module.exports.deleteRetweet = function (req, callback) {
    User.findOneAndUpdate({ _id: util.stringToObjectId(req.params._id) },
        { $pull: { retweets: { _id: util.stringToObjectId(req.params._idretweet) } } },
        function (err, dbUser) {
            if (err)
                return callback(err, null);
            else
                return callback(null, dbUser);
        });
}

module.exports.addSubscribers = function (req, callback) {
    User.findOneAndUpdate({ _id: util.stringToObjectId(req.params._id) },
        { $push: { subscribers: util.stringToObjectId(req.params._idsub) } },
        function (err, dbUser) {
            if (err)
                return callback(err, null);
            else
                return callback(null, dbUser);
        });
}

module.exports.addFollowers = function (req, callback) {
    User.findOneAndUpdate({ _id: util.stringToObjectId(req.params._idsub) },
        { $push: { followers: util.stringToObjectId(req.params._id) } },
        function (err, dbUser) {
            if (err)
                return callback(err, null);
            else
                return callback(null, dbUser);
        });
}

module.exports.deleteFollower = function(req, callback){
    User.findOneAndUpdate({ _id: util.stringToObjectId(req.params._idsub) } ,
        {$pull: {followers: util.stringToObjectId(req.params._id)} },
        function(error, dbUser){
            if(error)
                return callback(error, null);
            else
                return callback(null,dbUser);
        }
    );
}

module.exports.unsubscribeUser = function (req, callback) {
    User.findOneAndUpdate({ _id: util.stringToObjectId(req.params._id) },
        { $pull: { subscribers: util.stringToObjectId(req.params._idsub) } },
        function (err, dbUser) {
            if (err)
                return callback(err, null);
            else
                return callback(null, dbUser);
        });
}

module.exports.isUserHasAnAccount = function (req, callback) {
    User.findOne({ _id: util.stringToObjectId(req.params._id) },
        function (err, dbUser) {
            if (err)
                return callback(err, null);
            else
                return callback(null, dbUser);
        });

}

module.exports.findSubscribers = function (req, callback) {
    User.find({ followers: util.stringToObjectId(req.params._id) },
        function (err, dbUsers) {
            if (err)
                return callback(err, null);
            else
                return callback(null, dbUsers)
        }
    );
}

module.exports.allAppUsers = function (req, callback) {
    User.find({
        _id: { $ne: util.stringToObjectId(req.params._id) },
        followers: { $ne: util.stringToObjectId(req.params._id) }
    },
        function (err, appUsers) {
            if (err)
                return callback(err, null);
            else
                return callback(null, appUsers);
        }
    );
}

