const {MongoClient} = require('mongodb') ;

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err,client) => {
  if(err)
  {
    console.log('unable to connect to the database');
    return ;
  }

  const db = client.db('TodoApp');

// delete all the records with name='naveen'

  // db.collection('Users').deleteMany({name:"naveen"})
  // .then(result => console.log(result))
  // .catch(err => console.log(error))

//delete the first record that matches the condition

    // db.collection('Users').deleteOne({name:'hari'})
    // .then(result => console.log(result))
    // .catch(err => console.log(error))

//findOneAndDelete - this deletes the first record that matches the condition and return the entire document in the result

    db.collection('Users').findOneAndDelete({name:'hari'})
    .then(result => console.log(result))
    .catch(err => console.log(err))    
})
