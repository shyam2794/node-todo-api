var request = require('supertest');
var expect = require('expect');

var {app} = require('../server');
var {Todo} = require('../models/todo');

beforeEach(done => {
  Todo.remove({})
  .then(() => done())
  .catch(err => done())
})

describe('testing the node Todo api post method',() => {

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

           Todo.find().then(doc => {
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
           expect(doc.length).toBe(0)
           done();
         }).catch(err => done(err))
      })


    })

});
