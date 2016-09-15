"use strict"

var chai = require('chai');
var http = require('chai-http');
chai.use(http);
var assert = require('chai').assert;
var server = require('../configuration/environnement').BASE_URL;

var request = chai.request(server);
var environnement = require('../configuration/environnement');
var MockUser = require('./mock/MockUser');

describe('Home', function () {
    it('Get / ', function (done) {
        request.get('/')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.success, true);
                done();
            });
    });
});

describe('User', function () {

    describe('POST /signup', function () {
        it('Should create a new account for the user', function (done) {
            request.post('/users/signup')
                .send(MockUser.ValidUser())
                .end(function (err, res) {
                    var expect = 201;
                    var actual = res.status;
                    assert.equal(expect, actual);
                    assert.isTrue(res.body.success);
                    assert.isNotNull(res.body.body);
                    done();
                })
        });
    });













});