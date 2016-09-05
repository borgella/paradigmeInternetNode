"use strict"

module.exports = {
    PORT: process.env.PORT || 4000,
    BASE_URL: process.env.BASE_URL || 'http://localhost:4000',
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/paradigmedb',
    SECRET: process.env.SECRET || 'si yo di w yo we m ou met di se pa vre',
    PATH:  ['/users/signup']
}