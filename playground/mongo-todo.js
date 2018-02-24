const MongoClient = require('mongodb').MongoClient;

// const {MongoClient,ObjectID} = require('mongodb');
// var id = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {
  if(err)
  {
    return console.log('There is a error in your connection',err);
  }
  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text:'completed node js',
  //   completed:false
  // } , (err,result) => {
  //   if(err)
  //   {
  //     return console.log('unable to insert in Todos')
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2));
  // });

  db.collection('Users').insertOne({
    name:'hari',
    age:27,
    location:'chennai'
  } , (err,result) => {
    if(err)
    {
      return console.log('unable to insert in Todos')
    }
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
  });

  client.close();
})
