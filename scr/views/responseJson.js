"use strict"

module.exports.responseJson = function(success,body,hateoas){
    return {
        success : success,
        body : body,
        hateoas : hateoas
    }
}