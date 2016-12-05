"use strict"

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var environnement = require('./configuration/environnement');
var response = require('./scr/views/responseJson');
var hateoas = require('./service/hateoas');
//var expressJWT = require('express-jwt');
//var passport = require('./service/facebook');

//All the app routes
var index = require('./scr/serverRoutes/index');
var users = require('./scr/serverRoutes/users');
var signup = require('./scr/serverRoutes/signup');
var utilisateurs = require('./scr/serverRoutes/utilisateurs');

var app = express();
app.disable('x-powered-by');

//app useful librairies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

//app.use(expressJWT({ secret: environnement.SECRET }).unless({ path: environnement.PATH }));
//app.use(passport.initialize());


//Connect to the dataBase
app.use(require('./configuration/database').getDataBaseConnection);

// Accept incoming 
app.use(environnement.headerAccess);

//The use of the routes
app.use('/auth', index);
app.use('/users', users);
app.use('/users/', signup);
app.use('/utilisateurs', utilisateurs);

app.use(express.static(__dirname + '/public'));
app.use('/', index);



// MiddleWare to catch 404 error when request ressource does not exist
app.use(function (req, res, next) {
  var err = new Error('Ressource do not exist.');
  err.code = 404;
  res.status(404)
     .send(response.responseJson(false, err.message, null, hateoas.link("home", {})));
});

// MiddleWare to catch 500 internal error from the server
app.use(function (err, req, res, next) {
  err.code = 500;
  res.status(500)
     .send(response.responseJson(false, err.message, null, hateoas.link("home", {})));
});


console.log('App is listening at port ' + app.listen(environnement.PORT, function () { }).address().port);