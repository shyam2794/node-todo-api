var mongoose = require('mongoose') ;

mongoose.Promise = global.Promise ;

if(process.env.NODE_ENV === 'production')
{
    mongoose.connect('mongodb://nodeapidb:password@ds249818.mlab.com:49818/node_todo_api');
    return;
}
else {
  mongoose.connect('mongodb://localhost:27017/TodoApp');
  return ; 
}

//mongodb://localhost:27017/TodoApp
// module.exports = {
//   mongoose
// }
