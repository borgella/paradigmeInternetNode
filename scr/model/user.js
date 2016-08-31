"use strict"

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

module.exports.User = mongoose.model('User',new Schema({
    last_name :{
        type : String,
        require: [true,'The last name is required']
    }
}));