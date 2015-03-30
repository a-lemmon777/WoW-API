/**
 * Created by a.lemmon777 on 3/29/2015.
 */
var app = require('../app');
var request = require('supertest');

describe('GET /', function() {
    it('should display a message detailing how to use the API', function(done) {
        request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /text/)
            .end(function (err, response) {
                if (err) return done(err);
                done();
            });
    });
});