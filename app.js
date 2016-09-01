"use strict"

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var environnement = require('./configuration/environnement');
var login = require('./src/routes/login');

var app = express();

app.use(bodyParser.Json());
app.use(bodyParser.urlenconded({extended: false}));
app.use(cookieParser());

//The use of the routers

app.use('/',login);

app.listen(environnement.PORT,function(){
    console.log('app is listening at port' + environnement.Port);
});

//console.log('app is listening at port'+ app.listen(environnement.Port,function(){}).adress().adress);