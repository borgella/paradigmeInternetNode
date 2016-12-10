"use strict"

module.exports.responseJson = function (success, body, token, hateoas) {
    return {
        success: success,
        body: body,
        token: token,
        hateoas: hateoas
    };
}