var request = require('supertest');
var expect = require('expect');
var {ObjectID} = require('mongodb');

var {app} = require('../server');
var {Todo} = require('../models/todo');

var todos = [
              { _id:new ObjectID("5a92d591403e573dd4521c9e"),
                text:"test todo 1"} ,
              { _id:new ObjectID("5a92d591403e573dd4521c9f"),
                text:"test todo 2"}
            ];

// This runs before each test
beforeEach(done => {
  Todo.remove({})
  .then(() => Todo.insertMany(todos))
  .then(() => done())
  .catch(err => done())
})

describe('Todo POST/',() => {

    it('should create a new todo and save in mongo',(done) => {
          var text = "testing data";

          request(app)
          .post('/todos')
          .send({text})
          .expect(200)
          .expect(res => {
            expect(res.body.text).toBe(text)
          })
          .end((err,res) => {
            if(err)
            {
              return done(err);
            }

           Todo.find({text}).then(doc => {
                expect(doc.length).toBe(1);
                expect(doc[0].text).toBe(text);
                done();
           }).catch(err => done(err))
        });
    });

    it('should return a error when todo conditions are not met',(done) => {
      var text="";
      request(app)
      .post('/todos')
      .send({text})
      .expect(400)
      .end((err,res) =>{
         if(err)
         {
           return done(err)
         }

         Todo.find().then(doc => {
           expect(doc.length).toBe(2)
           done();
         }).catch(err => done(err))
      })
    })

});

describe('Todo GET/' , () => {

    it('should get the list of todos' , (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect( res => {
          expect(res.body.Todos.length).toBe(2)
        })
        .end(done)
    })
})

describe('Todo GET/:id' , () => {
  it('should return a error when the id is invalid',(done)=> {
    var id = "1234";
    request(app)
    .get(`/todos/${id}`)
    .expect(400)
    .expect(res => {
      expect(res.body.errorMessage).toBe("The entered id is invalid please enter a valid id")
    })
    .end(done);
  })

  it('should return error when the record is not found',(done)=> {
    var id="6a92d591403e573dd4521c9f";
    request(app)
    .get(`/todos/${id}`)
    .expect(404)
    .expect(res => {
      expect(res.body.errorMessage).toBe("There is no todo available in this id")
    })
    .end(done);
  })

  it('should return todo when the id matches',(done)=> {
    var id="5a92d591403e573dd4521c9e";
    request(app)
    .get(`/todos/${id}`)
    .expect(200)
    .expect(res => {
      expect(res.body.todo._id).toBe(id)
    })
    .end(done);
  })

})
