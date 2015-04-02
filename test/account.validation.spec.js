/**
 * Created by a.lemmon777 on 4/2/2015.
 */
var app = require('../app');
var should = require('should');
var request = require('supertest');
var models = require('../api/account/account.model');
var Account = models.Account;

describe('Validation for account creation', function() {
    before(function (done) {
        Account.remove({}, done);
    });

    after(function (done) {
        Account.remove({}, done);
    });

    it('should reject not providing a name', function(done) {
        request(app)
            .post('/account')
            .send({})
            .expect(500, done);
    });

    it('should reject providing an empty string for a name', function(done) {
        request(app)
            .post('/account')
            .send({name: ""})
            .expect(500, done);
    });
});

describe('Validation for character creation', function() {
    before(function(done) {
        Account.remove({}, function() {
            Account.create({
                account_name: "Betsy",
                link: "https://wow-api.herokuapp.com/account/Betsy"
            }, done);
        });
    });

    after(function(done) {
        Account.remove({}, done);
    });

    it('should reject not providing a name', function(done) {
        request(app)
            .post('/account/Betsy/characters')
            .send({race: "Orc", class: "Warrior", faction: "Horde", level: 45})
            .expect(500, done);
    });

    it('should reject providing an empty string for a name', function(done) {
        request(app)
            .post('/account/Betsy/characters')
            .send({name: "", race: "Orc", class: "Warrior", faction: "Horde", level: 45})
            .expect(500, done);
    });

    it('should reject not providing a race', function(done) {
        request(app)
            .post('/account/Betsy/characters')
            .send({name: "Blackhand", class: "Warrior", faction: "Horde", level: 45})
            .expect(500, done);
    });

    it('should reject not providing a class', function(done) {
        request(app)
            .post('/account/Betsy/characters')
            .send({name: "Blackhand", race: "Orc", faction: "Horde", level: 45})
            .expect(500, done);
    });

    it('should reject not providing a faction', function(done) {
        request(app)
            .post('/account/Betsy/characters')
            .send({name: "Blackhand", race: "Orc", class: "Warrior", level: 45})
            .expect(500, done);
    });

    it('should reject not providing a level', function(done) {
        request(app)
            .post('/account/Betsy/characters')
            .send({name: "Blackhand", race: "Orc", class: "Warrior", faction: "Horde"})
            .expect(500, done);
    });

    it('should reject incorrect race', function(done) {
        request(app)
            .post('/account/Betsy/characters')
            .send({name: "Blackhand", race: "Moose", class: "Warrior", faction: "Horde", level: 45})
            .expect(500, done);
    });

    it('should reject incorrect class', function(done) {
        request(app)
            .post('/account/Betsy/characters')
            .send({name: "Blackhand", race: "Orc", class: "Attorney", faction: "Horde", level: 45})
            .expect(500, done);
    });

    it('should reject incorrect faction', function(done) {
        request(app)
            .post('/account/Betsy/characters')
            .send({name: "Blackhand", race: "Orc", class: "Warrior", faction: "Leopards", level: 45})
            .expect(500, done);
    });

    it('should reject a nonpositive level', function(done) {
        request(app)
            .post('/account/Betsy/characters')
            .send({name: "Blackhand", race: "Orc", class: "Warrior", faction: "Horde", level: 0})
            .expect(500, done);
    });

    it('should reject a level that is too high', function(done) {
        request(app)
            .post('/account/Betsy/characters')
            .send({name: "Blackhand", race: "Orc", class: "Warrior", faction: "Horde", level: 9000})
            .expect(500, done);
    });

    it('should accept this good character', function(done) {
        request(app)
            .post('/account/Betsy/characters')
            .send({name: "Valeera", race: "Blood Elf", class: "Death Knight", faction: "Horde", level: 45})
            .expect(200, done);
    });
});

describe('Validation for Horde vs Alliance', function() {
    beforeEach(function (done) {
        Account.remove({}, done);
    });

    after(function (done) {
        Account.remove({}, done);
    });

    it('should reject alliance character if affiliated with Horde', function(done) {
        Account.create({
            account_name: "Betsy",
            link: "https://wow-api.herokuapp.com/account/Betsy",
            characters: [{name: "Valeera", race: "Blood Elf", class: "Death Knight", faction: "Horde", level: 45}]
        }, function(err) {
            if (err) { return done(err); }
            request(app)
                .post('/account/Betsy/characters')
                .send({name: "Leeroy", race: "Worgen", class: "Druid", faction: "Alliance", level: 2})
                .expect(500, done);
        });
    });
});