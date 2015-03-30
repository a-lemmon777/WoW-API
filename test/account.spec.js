/**
 * Created by a.lemmon777 on 3/29/2015.
 */
var app = require('../app');
var should = require('should');
var request = require('supertest');
var Account = require('../api/account/account.model');

describe('GET /account', function() {
    it('should get an empty array if the database is empty', function(done) {
        Account.remove({}, function (err, accounts) {
            request(app)
                .get('/account')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, response) {
                    if (err) return done(err);
                    response.body.should.have.property("accounts");
                    response.body.accounts.should.have.length(0);
                    done();
                });
        });
    });
});

describe('POST /account', function() {
    it('should be able to add a new account', function(done) {
        request(app)
            .post('/account')
            .send({name: "testAccount"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, response) {
                if (err) return done(err);
                response.body.should.have.property('_id');
                response.body.account_name.should.equal("testAccount");
                done();
            });
    });
});

