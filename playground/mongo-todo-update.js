const {MongoClient,ObjectID} = require('mongodb') ;

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err,client) => {
  if(err)
  {
    console.log('unable to connect to the database');
    return ;
  }

  const db = client.db('TodoApp');

//findOneAndUpdate - this Updates the record that matches the condition and return the updated document in the result
// when the returnOriginal is set to false

    db.collection('Users').
    findOneAndUpdate(
      {_id:new ObjectID('5a9151d7176ad91befe5722d')} ,
      {
        $set :
         {name:'sachin' }
        ,
         $inc:
         { age : 3 }
      } ,
      { returnOriginal:false } )
    .then(result => console.log(result))
    .catch(err => console.log(err))
})
