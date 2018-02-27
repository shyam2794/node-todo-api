require('../server/db/mongoose');
var {User} = require('../server/models/user');
var {Todo} = require('../server/models/todo');


// will remove all the docs in the collection - should pass the empty object {} in remove()
// Todo.remove({}).then(result => console.log(result))
// .catch(err => console.log(err));


//find one and remove will remove the first occurence that matches the condition will return the removed doc
//
// Todo.findOneAndRemove({_id:'5a94fc54a74ddc0ea030511d'}).then(result => console.log(result))
// .catch(err => console.log(err));

//findByIdAndRemove will remove the doc that matches with the id

Todo.findByIdAndRemove('5a94fc47a74ddc0ea030511b').then(doc => console.log(doc))
.catch(err => console.log(err));
