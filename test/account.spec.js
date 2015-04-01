/**
 * Created by a.lemmon777 on 3/29/2015.
 */
var app = require('../app');
var should = require('should');
var request = require('supertest');
var Account = require('../api/account/account.model');

describe('GET /account', function() {
    beforeEach(function(done) {
        Account.remove().exec().then(function () {
            done();
        });
    });

    after(function(done) {
        Account.remove().exec().then(function() {
            done();
        });
    });

    it('should get an object with an empty array if the database is empty', function(done) {
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

    it('should get an object with an array of length 2 if the database has 2 accounts', function(done) {
        var account1 = new Account({account_name: "TeamTed"});
        var account2 = new Account({account_name: "TeamTheresa"});
        account1.save(function() {
            account2.save(function() {
                request(app)
                    .get('/account')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function (err, response) {
                        if (err) return done(err);
                        response.body.should.have.property("accounts");
                        response.body.accounts.should.have.length(2);
                        response.body.accounts[0].should.have.property("account_id");
                        response.body.accounts[0].should.have.property("account_name");
                        response.body.accounts[0].should.not.have.property("__v");
                        response.body.accounts[0].should.not.have.property("_id");
                        done();
                    });
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
                response.body.should.have.property('account_id');
                response.body.account_name.should.equal("testAccount");
                done();
            });
    });
});

