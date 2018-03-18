var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');

/*
var newTodo = new Todo({
    name:'Buy Milk ',
});


var user = new User({
    email: "brenno.tondato@gmail.com"
});

newTodo.save().then(function(doc){
    console.log(JSON.stringify(doc, undefined, 2));
},function(err){
    console.log(err);
});


user.save().then(function(value){
    console.log('User saved', value);
}, function(err){
    console.log(err);
});
*/

var app = express();

app.use(bodyParser.json());

app.post('/todos', function(req, res){
    //console.log(req.body.text);

    var todo = new Todo({
        name: req.body.text
    });

    todo.save().then(function(doc){
        res.send(doc);
    }, function(err){
        res.status(400).send(err);
    });

});



app.listen(3000, function(){
   console.log('Server listening on port 3000');
});