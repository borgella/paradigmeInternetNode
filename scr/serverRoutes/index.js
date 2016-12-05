"use strict"
var express = require('express');
var router = express.Router();
var response = require('../views/responseJson');
var hateoas = require('../../service/hateoas');
var passport = require('../../service/facebook');
var fs = require('fs');


router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook',
    { sucessRedirect: '/', failureRedirect: '/login' })
);

router.get('/', function (req, res, next) {
    fs.readFile('../../public/index.html', function (err, data) {
        if (err) {
            return console.error(err);
        }
        res.status(200).send("The File : " + data.toString());
    });
});

module.exports = router;