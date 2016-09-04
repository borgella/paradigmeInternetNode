"use strict"

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var environnement = require('./configuration/environnement');
var response = require('./scr/views/responseJson');
var hateoas = require('./service/hateoas');

//All the app routes
var index = require('./scr/serverRoutes/index');
var users = require('./scr/serverRoutes/users');
var signup = require('./scr/serverRoutes/signup');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Connect to the dataBase
app.use(require('./configuration/database').getDataBaseConnection);

//The use of the routes
app.use('/',index);
app.use('/users',users);
app.use('/users/',signup);



// MiddleWare to catch 404 error when request ressource does not exist
app.use(function(req, res, next) {
  var err = new Error();
  err.status = 404;
  res.status(404).send(response.responseJson(false,err.message,hateoas.link("home",{})));
});

// MiddleWare to catch 500 internal error from the server
app.use(function(err, req, res, next) {
  res.status(500).send(response.responseJson(false,err.message,hateoas.link("home",{})));
});

console.log('App is listening at port '+ app.listen(environnement.PORT,function(){}).address().port);