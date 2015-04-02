/**
 * Created by a.lemmon777 on 3/29/2015.
 */
var app = require('../app');
var should = require('should');
var request = require('supertest');
var models = require('../api/account/account.model');
var Account = models.Account;

describe('GET /account', function() {
    beforeEach(function(done) {
        Account.remove({}, done);
    });

    after(function(done) {
        Account.remove({}, done);
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
        Account.create({account_name: "TeamTed"}, function() {
            Account.create({account_name: "TeamTheresa"}, function() {
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

describe('POST /account/{acount_name}/characters', function() {
    beforeEach(function(done) {
        Account.remove({}, function() {
            Account.create({account_name: "Rocky"}, done);
        });
    });

    after(function(done) {
        Account.remove({}, done);
    });

    it('should be able to add another character', function(done) {
        request(app)
            .post('/account/Rocky/characters')
            .send({name: "Blackhand", race: "Orc"})//, race: "Orc", class: "Warrior", faction: "Horde", level: 45})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, response) {
                if (err) return done(err);
                response.body.should.have.property("character_id");
                response.body.name.should.equal("Blackhand");
                response.body.race.should.equal("Orc");
                //response.body.class.should.equal("Warrior");
                //response.body.faction.should.equal("Horde");
                //response.body.level.should.equal(45);
                done();
            });
    });
});

