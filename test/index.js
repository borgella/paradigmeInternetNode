"use strict"

var chai = require('chai');
var http = require('chai-http');
chai.use(http);
var assert = require('chai').assert;
var server = require('../configuration/environnement').BASE_URL;

var request = chai.request(server);


describe('Home',function(){
  it('GET / ',function(done){
      request.get('/')
      .end(function(err, res){
        assert.equal(res.status,200);
        assert.equal(res.body.success,true);
        done();
      });
  });
});