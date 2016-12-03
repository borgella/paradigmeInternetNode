"use strict"

module.exports = {
    PORT: process.env.PORT || 4000,
    BASE_URL: process.env.BASE_URL || 'http://localhost:4000',
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://borgella:paradigmedb@ds119748.mlab.com:19748/paradigmedb',
    SECRET: process.env.SECRET || 'si yo di w yo we m ou met di se pa vre',
    CLIENT_ID: process.env.CLIENT_ID || 322608071422956,
    CLIENT_SECRET: process.env.CLIENT_SECRET || '9ba5a624c5392b9fb26a89e66a4abe63',
    PATH: ['/users/signup' , '/users/login']
        
}

module.exports.headerAccess = function(req,res,next){
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    next();
}

/**'mongodb://localhost:27017/paradigmedb' */