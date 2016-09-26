var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);


describe('allergen-free-recipes', function() {
  it('get status code 200 and html on root', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
    });
  });
  
  it('get status code 200 and html on recipeList.html', function(done) {
    chai.request(app)
      .get('/recipeList.html')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
    });
  });
  
  it('get status code 200 and html on recipes.html', function(done) {
    chai.request(app)
      .get('/recipes.html')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
    });
  });
  
  
});