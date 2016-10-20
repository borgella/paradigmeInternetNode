"use strict"

module.exports = {
    PORT: process.env.PORT || 4000,
    BASE_URL: process.env.BASE_URL || 'http://localhost:4000',
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/paradigmedb',
    SECRET: process.env.SECRET || 'si yo di w yo we m ou met di se pa vre',
    CLIENT_ID: process.env.CLIENT_ID || 322608071422956,
    CLIENT_SECRET: process.env.CLIENT_SECRET || '9ba5a624c5392b9fb26a89e66a4abe63',
    PATH: ['/', '/auth/facebook/callback', '/auth/facebook',
        '/users/signup', '/login', '/utilisateurs/fil', '/utilisateurs/tweets', '/utilisateurs/tweet',
        '/utilisateurs/abonnements', '/utilisateurs/retweet', '/utilisateurs/retweets']
        
}