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

const port = process.env.PORT || 3000;

//Module to post some todo on database
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

//Module to get all todos at once
app.get('/todos', function(req, res){
    Todo.find().then(function(todos){
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    })
});

//Module to get todos by ID
app.get('/todos/:id', function(req, res){
    const id = req.params.id;

    if (!ObjectID.isValid(id)){
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

//Modulo para get a todo by name
/*
app.get('/todos/:name', (req, res) =>{
   console.log(req.params.name);
});
*/

//Module to delete todo found by id
app.delete('/todos/:id', (req, res)=>{
   const id = req.params.id;git

   if (!ObjectID.isValid(id)){
       return res.status(404).send();
   }

   Todo.findByIdAndRemove(id).then((todo)=>{
       if(!todo){
           return res.status(404).send();
       }
       res.send({todo});
   }).catch((err)=>{
       res.status(404).send();
   });

});


app.listen(port, function(){
   console.log(`Server listening on port:` + port);
});

module.export = {app};