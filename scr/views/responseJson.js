"use strict"

module.exports.responseJson = function (success, body, token, hateoas) {
    return {
        success: success,
        body: body,
        toke: token,
        hateoas: hateoas
    };
}