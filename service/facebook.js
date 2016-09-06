"use strict"

var environnement = require('../configuration/environnement');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new FacebookStrategy({
    clientID: environnement.CLIENT_ID,
    clientSecret: environnement.CLIENT_SECRET,
    callbackURL: environnement.BASE_URL + '/'
},
function(accessToken, refreshToken, profile, callback){
    return callback(null, profile);
}));

passport.serializeUser(function(user,callback){
    callback(null, user);
});

passport.deserializeUser(function(user,callback){
    callback(null,user);
});

module.exports = passport;