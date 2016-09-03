"use strict"


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