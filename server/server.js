// mongo connection URL in local - mongod.exe --dbpath C:\Users\ADMIN\Desktop\mongo-data

var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
//var {mongoose} = require('./db/mongoose');

require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user')

var app = express();
app.use(bodyParser.json());

// creating a todo in the database
app.post('/todos',(req,res) => {
  new Todo({
    text:req.body.text
  }).save()
  .then(doc => {
    console.log(doc);
    res.send(doc)}
  )
  .catch(err => res.status(400).send(err))
})

// reading the list of todos from the database
app.get('/todos',(req,res) => {
     Todo.find()
     .then( Todos => res.send({Todos}))
     .catch(err => res.status(400).send(err))
})

// reading the todo by specific id , that is being passed in the url
// the route with parameters should be mentioned with "colon :" --> "/:id"

app.get('/todos/:id',(req,res) => {
// validating whether the id .
   if(!ObjectID.isValid(req.params.id))
   {
    var err = { errorMessage:"The entered id is invalid please enter a valid id"} ;
    res.status(400).send(err) ;
    return ;
   }

     Todo.findById(req.params.id)
     .then( todo => {
       if(!todo)
       {  var err = { errorMessage:"There is no todo available in this id"}
          res.status(404).send(err)
          return ;
       }
       res.send({todo})
     }).catch(err => res.status(400).send(err))
})

app.delete('/todos/:id' , (req,res) => {
       if(!ObjectID.isValid(req.params.id))
       {
         var err = { errorMessage:"The entered id is invalid please enter a valid id"} ;
         res.status(400).send(err) ;
         return ;
       }

       Todo.findByIdAndRemove(req.params.id)
       .then(doc => {
         if(!doc)
         {
           var err = { errorMessage:"There is no todo available in this id"}
             res.status(404).send(err)
             return ;
         }
        res.send({doc});
      }).catch(err =>res.status(400).send(err))

})


const port = process.env.PORT || 5000;

app.listen(port,() => {
  console.log(`The app has started at port ${port}`);
})

module.exports = {
  app
}
