"use strict"

module.exports = {
    PORT: process.env.PORT || 4000,
    BASE_URL: process.env.BASE_URL || 'http://localhost:4000',
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://borgella:paradigmedb@ds119598.mlab.com:19598/heroku_j34wdc4k',
    SECRET: process.env.SECRET || 'si yo di w yo we m ou met di se pa vre',
    CLIENT_ID: process.env.CLIENT_ID || 322608071422956,
    CLIENT_SECRET: process.env.CLIENT_SECRET || '9ba5a624c5392b9fb26a89e66a4abe63',
    AWSAccessKeyId: process.env.AWSAccessKeyId || 'AKIAIL2WOASMNKYP5EMQ',
    AWSSecretKey: process.env.AWSSecretKey || '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',
    PATH: ['/users/signup' , '/users/login', '/utilisateurs/abonnements/:_id/:_idsub', '/utilisateurs/suggestions/:_id']
        
}

module.exports.headerAccess = function(req,res,next){
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    return next();
}
