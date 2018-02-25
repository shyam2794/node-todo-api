// connecting to the db and trying to fetch the todos and user collection by id
var {ObjectID} = require('mongodb')

require('../server/db/mongoose');
var {Todo} = require('../server/models/todo');
var {User} = require('../server/models/user');

var id = '5a92d591403e573dd4521c9e';

console.log(ObjectID.isValid(id));

if(!ObjectID.isValid(id))
{
    console.log('The id is not valid')
}

// using find will return an array - when the document is not found it returns a empty array .

Todo.find({_id:id}) // no need to use "new ObjectID('5a92d591403e573dd4521c9e')" --> mongoose does the conversion automatically
.then(todos => console.log(todos))
.catch(err => console.log(err))

// using findOne will return the first occurence of the document which is a object
// when the document is not found it returns "null" instead of empty array.
// use this when you are finding a specific document .

Todo.findOne({_id:id})
.then(todo => console.log(todo))
.catch(err => console.log(err))

// using findOne will return the first occurence of the document which is a object
// when the document is not found it returns "null" instead of empty array.
// use this when you are finding a specific document by id .

Todo.findById(id)
.then(todo => console.log(todo))
.catch(err => console.log(err))

//validation of Id .
// 1. The id can be invalid when the entered id is different - this does not throw any error .
// 2. totally invalid id  - this throws an error .
