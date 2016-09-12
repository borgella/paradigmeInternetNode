"use strict"

var user = require('../model/user');

module.exports.saveInDataBase = function (req,res,next){
    req.body.save(function(error){
       if(error){
           res.status(404);
           if(error.code === 11000)
                next(new Error('This address email is already taking.'));
            else   
                next(new Error('Database error connection, the document could not be save.'));
       }else next();

    });
}

module.exports.findUserByEmail = function(value,callback){
    user.findOne({email:value},function(error,dbUser){
        if(error)
            return callback(error);
        else
           return callback(dbUser);
    }); 
}

module.exports.findUserById = function(id, callback){
    user.findOne({_id:id},function(err,dbUser){
        if(err)
            return callback(err);
        else 
            return callback(dbUser);
    });

}