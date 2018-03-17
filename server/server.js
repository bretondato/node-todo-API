var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
    name:{
        type:String
    },
    Completed:{
        type:Boolean
    },
    CompletedAt:{
        type:Number
    }
});

var newTodo = new Todo({
    name:'Cook rice for dinner',
    Completed: true,
    CompletedAt: 120009
});

newTodo.save().then(function(doc){
    console.log(JSON.stringify(doc, undefined, 2));
},function(err){
    console.log(err);
});