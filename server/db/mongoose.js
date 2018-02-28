
var mongoose = require('mongoose') ;

mongoose.Promise = global.Promise ;

var url = process.env.MONGO_URL ;

var env = process.env.NODE_ENV || 'development' ;

console.log('The environment is ',env);

if(env === 'production')
{
    mongoose.connect(url);
    return;
}else if (env === 'development'){
  mongoose.connect('mongodb://localhost:27017/TodoApp');
  return ;
}else {
  mongoose.connect('mongodb://localhost:27017/TodoAppTest');
  return ;
}


//mongodb://localhost:27017/TodoApp
// module.exports = {
//   mongoose
// }
