"use strict"

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var environnement = require('./configuration/environnement');
var login = require('./scr/routes/login');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//The use of the routers
app.use('/',login);

// Default express error handling 
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log('App is listening at port '+ app.listen(environnement.PORT,function(){}).address().port);