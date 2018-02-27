var mongoose = require('mongoose') ;

mongoose.Promise = global.Promise ;
mongoose.connect('mongodb://nodeapidb:password@ds249818.mlab.com:49818/node_todo_api');

//mongodb://localhost:27017/TodoApp
// module.exports = {
//   mongoose
// }
