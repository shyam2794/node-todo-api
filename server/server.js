var express = require('express');
var bodyParser = require('body-parser');

//var {mongoose} = require('./db/mongoose');

require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user')

var app = express();
app.use(bodyParser.json());

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

app.listen(5000,() => {
  console.log('The app has started at port 5000')
})

module.exports = {
  app 
}
