"use strict"

var environnement = require("../configuration/environnement");
var hateoas = require("hateoas")({baseUrl:environnement.BASE_URL});

hateoas.registerLinkHandler("home",function(){
    return {
        "self": "/"
    }
});
