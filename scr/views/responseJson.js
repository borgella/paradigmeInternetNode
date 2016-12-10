"use strict"

module.exports.responseJson = function (success, body, token, hateoas) {
    var obj = {
        success: success,
        body: body,
        token: token,
        hateoas: hateoas
    };
    return obj;
}