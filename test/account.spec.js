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
        Account.create({account_name: "TeamTed", link: "https://wow-api.herokuapp.com/account/TeamTed"}, function() {
            Account.create({account_name: "TeamTheresa", link: "https://wow-api.herokuapp.com/account/TeamTheresa"}, function() {
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
                        response.body.accounts[0].should.have.property("link");
                        response.body.accounts[0].should.not.have.property("__v");
                        response.body.accounts[0].should.not.have.property("_id");
                        //response.body.accounts[0].should.not.have.property("characters"); // Implement this
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
                response.body.should.have.property("account_id");
                response.body.should.have.property("link");
                response.body.account_name.should.equal("testAccount");
                //response.body.should.not.have.property("characters"); // Implement this
                // Make sure it's in the database
                Account.find({}, function(err, accounts) {
                    if (err) return done(err);
                    var account = accounts[0].toObject();
                    account.should.have.property("account_id");
                    account.should.have.property("link");
                    account.account_name.should.equal("testAccount");
                    done();
                });
            });
    });
});

describe('POST /account/{acount_name}/characters', function() {
    beforeEach(function(done) {
        Account.remove({}, function() {
            Account.create({account_name: "Rocky", link: "https://wow-api.herokuapp.com/account/Rocky"}, done);
        });
    });

    after(function(done) {
        Account.remove({}, done);
    });

    it('should be able to add another character', function(done) {
        request(app)
            .post('/account/Rocky/characters')
            .send({name: "Blackhand", race: "Orc", class: "Warrior", faction: "Horde", level: 45})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, response) {
                if (err) return done(err);
                response.body.should.have.property("character_id");
                response.body.name.should.equal("Blackhand");
                response.body.race.should.equal("Orc");
                response.body.class.should.equal("Warrior");
                response.body.faction.should.equal("Horde");
                response.body.level.should.equal(45);
                // Make sure it's in the database
                Account.findOne({account_name: "Rocky"}, function(err, account) {
                    if (err) return done(err);
                    var character = account.characters[0].toObject();
                    character.should.have.property("character_id");
                    character.name.should.equal("Blackhand");
                    character.race.should.equal("Orc");
                    character.class.should.equal("Warrior");
                    character.faction.should.equal("Horde");
                    character.level.should.equal(45);
                    done();
                });
            });
    });
});

describe('GET /account/{acount_name}/characters', function() {
    beforeEach(function(done) {
        Account.remove({}, function() {
            Account.create({account_name: "Betsy", link: "https://wow-api.herokuapp.com/account/Betsy"}, done);
        });
    });

    after(function(done) {
        Account.remove({}, done);
    });

    it('should get an account with an empty array of characters if no characters have been added', function(done) {
        request(app)
            .get('/account/Betsy/characters')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, response) {
                if (err) return done(err);
                response.body.should.have.property("account_id");
                response.body.account_name.should.equal("Betsy");
                response.body.characters.should.have.length(0);
                response.body.should.not.have.property("__v");
                response.body.should.not.have.property("_id");
                //response.body.should.not.have.property("link"); // Implement this
                done();
            });
    });

    it('should get an account with an array of length 2 if the account has 2 characters', function(done) {
        Account.findOne({account_name: "Betsy"}, function(err, account) {
            if (err) return done(err);
            account.characters.push({name: "Leeroy", race: "Worgen", class: "Druid", faction: "Alliance", level: 2});
            account.characters.push({name: "Jenkins", race: "Human", class: "Death Knight", faction: "Alliance", level: 22});
            account.save(function() {
                request(app)
                    .get('/account/Betsy/characters')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function (err, response) {
                        if (err) return done(err);
                        response.body.should.have.property("account_id");
                        response.body.account_name.should.equal("Betsy");
                        response.body.characters.should.have.length(2);
                        response.body.characters[0].should.have.property("name");
                        response.body.characters[0].should.have.property("race");
                        response.body.characters[0].should.have.property("class");
                        response.body.characters[0].should.have.property("faction");
                        response.body.characters[0].should.have.property("level");
                        response.body.characters[0].should.not.have.property("__v");
                        response.body.characters[0].should.not.have.property("_id");
                        done();
                    });
            })
        });
    });
});

