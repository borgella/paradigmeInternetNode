"use strict"

module.exports.ValidUser = function () {

    return {
        first_name: "Jean",
        last_name: "Borgella",
        email: "breal" + Math.random() + "@hotmail.com",
        password: "DadadaPasswordDebile2016",
        tweet: null,
        tweets: [],
        retweets: [],
        subcribers: [],
        followers: []
    }

}

module.exports.EmpyBody = function () {
    return {

    }
}