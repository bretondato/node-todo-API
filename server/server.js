var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');
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

app.get('/todos', function(req, res){
    Todo.find().then(function(todos){
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/todos/:id', function(req, res){
    var id = res.params.id;
    console.log(res.params.id);

    if (!ObjectID.$isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then(function(todo){
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch(function(err){
        res.status(400).send();
    })

});


app.listen(3000, function(){
   console.log('Server listening on port 3000');
});

module.export = {app};