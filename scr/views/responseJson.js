"use strict"

module.exports.responseJson = function (success, body, token, hateoas) {
    var obj = {};
    obj.success = success;
    obj.body = body;
    obj.token = token;
    obj.hateoas = hateoas;
    return obj;
}