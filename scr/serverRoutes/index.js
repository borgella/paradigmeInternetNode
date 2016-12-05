"use strict"
var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var passport = require('../../service/facebook');
var path = require('path');

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook',
    { sucessRedirect: '/', failureRedirect: '/login' })
);

router.get('/favicon.ico', function (req, res, next) {
    res.end();
});

router.get('/', function (req, res, next) {
    res.status(200)
        .sendFile(path.join(__dirname, 'public','index.html'));
});

module.exports = router;