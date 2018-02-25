var request = require('supertest');
var expect = require('expect');

var {app} = require('../server');
var {Todo} = require('../models/todo');

var todos = [
              { text:"test todo 1"} ,
              { text:"test todo 2"}
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
