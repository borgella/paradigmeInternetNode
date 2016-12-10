"use strict"
var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var passport = require('../../service/facebook');

router.get('/', function (req, res, next) {
    res.status(200)
    .redirect(303,'https://borgella.github.io/paradigm-angular/');
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook',
    { sucessRedirect: '/', failureRedirect: '/login' })
);

module.exports = router;