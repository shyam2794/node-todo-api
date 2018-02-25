var mongoose = require('mongoose');

var Todo = mongoose.model('Todo' , {
  text: {
    type: String,
    trim:true,
    minlength:3,
    required:true
  } ,
  completed:{
    type: Boolean,
    default:false
  },
  completedAt:{
    type: Number,
    default:null
  }
})

module.exports = {
  Todo
}
