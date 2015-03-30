/**
 * Created by a.lemmon777 on 3/29/2015.
 */
var app = require('../app');
var request = require('supertest');

describe('Account', function() {
    it('should be able to add new accounts', function(done) {
        request(app)
            .post('/account')
            .send({name: "testAccount"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, response) {
                if (err) return done(err);
                console.log(response.body);
                done();
            });
    });
});