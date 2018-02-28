// mongo connection URL in local - mongod.exe --dbpath C:\Users\ADMIN\Desktop\mongo-data
var express = require('express');
var bodyParser = require('body-parser');
//var {mongoose} = require('./db/mongoose');
require('./db/mongoose');

var app = express();
app.use(bodyParser.json());

require('./routes/route')(app)

const port = process.env.PORT || 5000;

app.listen(port,() => {
  console.log(`The app has started at port ${port}`);
})

module.exports = {
  app
}
