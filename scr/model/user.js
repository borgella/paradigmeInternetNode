"use strict"

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

mongoose.plugin(require('mongoose-valid8'));

var UserSchema = mongoose.Schema({
    id: objectId,

    first_name: {
        type: String,
        trim: true,
        require: [true, 'You must provide your first name.'],
        isAlpha: {
            message: 'Your first name should contains characters only.',
        },
        isLength: {
            message: 'Your last name should contains at least two characters and a maximum of 50.',
            min: 2,
            max: 50
        }
    },

    last_name: {
        type: String,
        trim: true,
        require: [true, 'You must provide your last name.'],
        isAlpha: {
            message: 'Your last name should contains characters only. ',
        },
        isLength: {
            message: 'Your last name should contains at least two characters and a maximum of 50.',
            min: 2,
            max: 50
        }
    },

    email: {
        type: String,
        unique: true,
        require: [true, 'The email adress is required.'],
        isEmail: {
            message: 'You should provide a valid email adress format.'
        }
    },

    password: {
        type: String,
        require: [true, 'You should provide a password if you are not stupid.'],
        isAlphaNumeric: {
            message: 'Your password should contains alpha-numeric characters and at least one uppercase characters.'
        },
        validate: {
            validator: function (value) {
                return /.*[A-Z].*/.test(value);
            },
            message: 'Your password should contains Uppercase characters.'
        }
    },

    Tweet: {
        _id: objectId,
        date: {
            type: Date,
            default: Date.now
        },
        text: {
            type: String
        }
    },

    tweets: [],

    retweets: [],

    subcribers: [],

    followers: []

});

UserSchema.methods.speaks = function () {
    console.log(this.last_name);
}

UserSchema.methods.getOneTweet = function (_id) {
    this.tweets.findIndex(function (_id) {
        if (tweet._id === _id)
            return tweet;
    });
    return null;
}

UserSchema.methods.addTweet = function (tweet) {
    this.tweets.push(tweet);
}

UserSchema.methods.addRetweet = function (_id) {
    if (this.followers.tweets.indexOf(_id) != -1) {
        this.retweets.push(this.followers.getOneTweet(_id));
        return this.followers.getOneTweet(_id);
    }
    return null;
}



var User = mongoose.model('User', UserSchema);

module.exports = User;