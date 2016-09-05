"use strict"

var environnement = require("../configuration/environnement");
var hateoas = require("hateoas")({baseUrl:environnement.BASE_URL});

hateoas.registerLinkHandler("home",function(){
    return {
        "self": "/",
        "login": "/users/login",
        "signup": "/users/signup"
    }
});

hateoas.registerLinkHandler("login",function(){
    return {
        "self": "/users/login",
        "home":"/",
        "logout": "/users/logout",
    }
});

hateoas.registerLinkHandler("logout",function(){
    return {
        "self": "/users/logout",
        "home":"/",
        "login": "/users/login",
        "signup": "/users/signup"
    }
});

hateoas.registerLinkHandler("signup",function(){
    return {
        "self": "/users/signup",
        "home": "/",
        "logout": "/users/nlogout"
    }
});

module.exports = hateoas;