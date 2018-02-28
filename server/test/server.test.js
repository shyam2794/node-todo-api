var request = require('supertest');
var expect = require('expect');
var {ObjectID} = require('mongodb');

var {app} = require('../server');
var {Todo} = require('../models/todo');

var todos = [
              { _id:new ObjectID("5a92d591403e573dd4521c9e"),
                text:"test todo 1"} ,
              { _id:new ObjectID("5a92d591403e573dd4521c9f"),
                text:"test todo 2",
                completed:true,
                completedAt:1519795351168}
            ];

// This runs before each test
beforeEach(done => {
  Todo.remove({})
  .then(() => Todo.insertMany(todos))
  .then(() => done())
  .catch(err => done())
})

describe('Todo POST/todos',() => {

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

describe('Todo GET/todos' , () => {

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

describe('Todo GET/todos/:id' , () => {
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

  describe('DELETE /todos/:id',() => {

    it('should delete a todo from database',(done)=>{
         var id = '5a92d591403e573dd4521c9e'
        request(app)
        .delete(`/todos/${id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.doc._id).toBe(id)
        })
        .end((err,res) => {
          if(err)
          {
            done(err);
            return;
          }

          Todo.findById(id).then(todo => {
            expect(todo).toBeNull();
            done();
          })
          .catch(err => console.log(err))
        })
    })

    it('should send error when id to be deleted is not found',(done)=>{
         var id = '6a92d591403e573dd4521c9e';
         request(app)
         .delete(`/todos/${id}`)
         .expect(404)
         .expect(res => {
           expect(res.body.errorMessage).toBe('There is no todo available in this id')
         })
         .end(done)
    })

    it('should send error when the id is invalid',(done)=>{
      var id = '123';
      request(app)
      .delete(`/todos/${id}`)
      .expect(400)
      .expect(res => {
        expect(res.body.errorMessage).toBe('The entered id is invalid please enter a valid id')
      })
      .end(done)
    })
})

describe('Todo PATCH/todos/:id' , () => {

    it('should update the todo' , (done) => {
          var id = "5a92d591403e573dd4521c9e" ;

          request(app)
          .patch(`/todos/${id}`)
          .send({text:"test todo",completed:true})
          .expect(200)
          .expect(res => {
            expect(res.body.todo.text).toBe('test todo') ;
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeGreaterThan(0);
          })
          .end(done)
    })

    it('should set completedAt to null when todo is not completed' , (done) => {
          var id = "5a92d591403e573dd4521c9f" ;

          request(app)
          .patch(`/todos/${id}`)
          .send({completed:false})
          .expect(200)
          .expect(res => {
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toBeNull();
          })
          .end(done)
    })

})
