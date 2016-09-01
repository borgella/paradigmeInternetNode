"use strict"

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

mongoose.plugin(require('mongoose-valid8'));

module.exports.User = mongoose.model('User',new Schema({
    _id : objectId,
    first_name :{
        type : String,
        trim : true,
        require :[true,'You must provide your first name.'],
        isAlpha:{
            message: 'Your first name should contains characters only.',
            options:{
                isLength :{
                    message :'Your first name should contains at least two characters and a maximum of 50.',
                    min : 2,
                    max : 50
                }
            }
        }
    },

    last_name :{
        type : String,
        trim : true,
        require :[true,'You must provide your last name.'],
        isAlpha:{
            message: 'Your last name should contains characters only. ',
            options:{
                isLength :{
                    message :'Your last name should contains at least two characters and a maximum of 50.',
                    min : 2,
                    max : 50
                }
            }
        }
    },

    email:{
        type : String,
        require: [true,'The email adress is required.'],
        isEmail:{
            message:'You should provide a valid email adress format.'
        }
    },

    password:{
        type: String,
        require: [true,'You should provide a password if you are not stupid.'],
        isAlphaNumeric:{
            message: 'Your password should contains alpha-numeric characters and at least one uppercase characters.'
        },

        validate:{
            validator: function(value){
                return /.*[A-Z].*/.test(value);
            },
            message: 'Your password should contains alpha-numeric characters and at least one uppercase characters.'
        }
    },

    tweet:{
        _id: objectId,
        date:{
            type: Date,
            default: Date.now
        },
        text:{
            type: Object
        }
    },

    tweets:[],

    retweets:[],

    subcribers:[],

    followers:[]
    
}));