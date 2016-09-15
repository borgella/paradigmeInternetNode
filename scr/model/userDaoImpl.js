"use strict"
var mongoose = require('mongoose');
var User = require('../model/user');

module.exports.saveInDataBase = function (req, res, next) {
    req.body.save(function (error) {
        if (error) {
            res.status(404);
            if (error.code === 11000)
                next(new Error('This address email is already taking.'));
            else
                next(new Error('Database error connection, the document could not be save.'));
        } else next();

    });
}

module.exports.findUserByEmail = function (req, callback) {
    User.findOne({ email: req.body.email }, function (error, dbUser) {
        if (error)
            return callback(error);
        else
            return callback(dbUser);
    });
}

module.exports.findUserById = function (req, callback) {
    User.findOne({ _id: stringToObectId(req.headers._id) }, function (err, dbUser) {
        if (err)
            return callback(err);
        else
            return callback(dbUser);
    });

}

module.exports.postTweet = function (req, callback) {
    User.findOneAndUpdate({ _id: stringToObectId(req.headers._id) },
        { $push: { tweets: req.body.tweet } },
        function (err, dbUser) {
            if (err)
                return callback(err);
            else
                return callback(dbUser);
        });
}

function stringToObectId(a_string) {
    return new mongoose.mongo.ObjectId(a_string);
}
