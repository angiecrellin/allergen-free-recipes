var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);


describe('allergen-free-recipes', function() {
  
  before(function(done) {
       
        server.runServer(function() {
          done();
        });
    });
  it('should get status code 200 and html on root', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

  it('should list recipes on GET', function(done) {
    chai.request(app)
      .get('/api/recipes')
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('ingredients');
        res.body[0].should.have.property('directions');
        res.body[0].should.have.property('category');
        res.body[0].should.have.property('allergenFree');
        res.body[0]._id.should.be.a('string');
        res.body[0].name.should.be.a('string');
        res.body[0].ingredients.should.be.a('array');
        res.body[0].directions.should.be.a('string');
        res.body[0].category.should.be.a('string');
        res.body[0].allergenFree.should.be.a('array');
        done();
      });
  });

  describe('POST', function() {

    it('should add a recipe on POST', function(done) {
      chai.request(app)
        .post('/api/recipes')
        .send({
          'name': 'Cookie',
            'ingredients': ['flour'],
            'directions': 'bake',
            'category': 'dessert',
            'allergenFree': ['peanut']
        })
        .end(function(err, res) {
          should.equal(err, null);
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('_id');
          res.body.name.should.be.a('string');
          res.body._id.should.be.a('string');
          res.body.name.should.equal('Cookie');
          done();
        });
    });

    it('should return an error when posting to id that exists', function(done) {
      chai.request(app)
        .post('/api/recipes/0')
        .send({
          'name': ''
        })
        .end(function(err, res) {
        res.should.have.status(404);
        done();
        });
    });

    it('should return an error when post without body data', function(done) {
      chai.request(app)
        .post('/api/recipes')
        .end(function(err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.equal('no data sent')
          done();
      });
    });

    it('should return an error if not valid JSON', function(done) {
      chai.request(app)
        .post('/api/recipes')
        .send('{"name"}:" "')
        .end(function(err, res) {
          res.should.have.status(400);
          res.should.be.json;
          res.body.message.should.equal('no data sent')
          done();
        });
    });

  });
  
  // PUT tests
  
  describe('DELETE', function() {
    var existingRecipes = [];
    before(function(done){
      chai.request(app)
      .get('/api/recipes')
      .end(function(err, res) {
      existingRecipes = res.body;
        done();
      });
    })
    

    it('should delete an item on DELETE', function(done) {
      chai.request(app)
        .delete('/api/recipes/' + existingRecipes[0]._id)
        .end(function(err, res) {
          should.equal(err, null);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          done();
        });

  });

      it('should return an error when id does not exist', function(done) {
        chai.request(app)
          .delete('/api/recipes/1000')
          .end(function(err, res) {
          res.should.have.status(404);
          res.should.be.json;
          res.body.message.should.equal('id does not exist')
          done();
        });
  });

      it('should return an error if endpoint without id', function(done) {
        chai.request(app)
          .delete('/api/recipes')
          .send({
              'name': ''
                })
          .end(function(err, res) {
          res.should.have.status(404);
          done();
        });

  });

});



  /*it('get status code 200 and html on recipeList.html', function(done) {
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
  });*/


});