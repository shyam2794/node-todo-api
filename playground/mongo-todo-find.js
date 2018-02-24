const {MongoClient,ObjectId} = require('mongodb') ;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {

   if(err)
    {
      return console.log('unable to connect to the database',err);
    }

    console.log('The db is connected successfully');
    var db = client.db('TodoApp');

// finding the user based on Id

    // var query = {_id:new ObjectId('5a8fd3aa47b69d3a808a9b03')};
    // db.collection('Users').find(query).toArray()
    // .then(docs => {
    //   console.log('The documents are accessible')
    //   console.log('The list of users are \n' , JSON.stringify(docs,undefined,2))})
    // .catch(err => console.log('unable to retrive the documents',err))

// Getting the count of users

    // db.collection('Users').find().count()
    // .then(count => console.log('The count of users is : ',count))
    // .catch(err => console.log('Unable to get the count:',err))

// practice getting the documents with name = 'naveen'

     db.collection('Users').find({name:'naveen'}).toArray()
     .then(docs => console.log(JSON.stringify(docs,undefined,2)))
     .catch(err => console.log('Unable to get the docs'))


    client.close();

})
