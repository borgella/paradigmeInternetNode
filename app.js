"use strict"

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var environnement = require('./configuration/environnement');
var response = require('./scr/views/responseJson');
var hateoas = require('./service/hateoas');

//All the app routes
var index = require('./scr/routes/index');
var users = require('./scr/routes/users');
var signup = require('./scr/routes/signup');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Connect to the dataBase
app.use(require('./configuration/database').getDataBaseConnection);

//The use of the routers
app.use('/',index);
app.use('/users',users);
app.use('/users/',signup);



// MiddleWare to catch 404 error
app.use(function(req, res, next) {
  var err = new Error('The ressource can not Found');
  err.status = 404;
  res.status(404).send(response.responseJson(false,err.message,hateoas.link("home",{})));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .send('error', { message: err.message, error: {} });
});

console.log('App is listening at port '+ app.listen(environnement.PORT,function(){}).address().port);