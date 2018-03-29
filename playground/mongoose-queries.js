const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');

var id = '5ab0653f8372fe37d512dbfe';

Todo.find({
    _id:id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id:id
}).then((todo) => {
    console.log('Todos', todo);
});