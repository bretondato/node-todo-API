const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {ObjectID} = require('mongodb');
const {user} = require('./../server/models/user');

// Callback to remove all the data from data base
/*
Todo.remove({}).then((result) =>{
   console.log(result);
});
*/

// Callback to remove only one data found by the attribute that you passed
/*
Todo.findOneAndRemove({name: 'grrr'}).then((res)=>{
   console.log(res);
});
*/

//callback to remove by id
Todo.findByIdAndRemove('5ac2bfa54dc1811b777a4b49').then((res)=>{
   console.log(res)
});

