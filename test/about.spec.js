/**
 * Created by a.lemmon777 on 4/1/2015.
 */
 
var app = require('../app');
var should = require('should');
var request = require('supertest');

describe('GET /about', function() {
  it('should provide an author and link to source code', function(done) {
    request(app)
      .get('/about')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, response) {
        if (err) return done(err);
        response.body.author.should.equal('Aaron Lemmon');
        response.body.source.should.equal('https://github.com/lemmo031/WoW-API');
        done();
      });
  });
});
