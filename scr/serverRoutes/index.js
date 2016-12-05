"use strict"
var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var passport = require('../../service/facebook');

//router.get('/', function (req, res, next) {
  //  res.status(200);
    //res.send(response.responseJson(true, "the home page", null, hateoas.link("home", {})));
//});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook',
    { sucessRedirect: '/', failureRedirect: '/login' })
);

module.exports = router;