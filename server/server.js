require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
var {authenticate} = require('./middleware/authenticate');
/*
var newTodo = new Todo({
    name:'Buy Milk ',
});
newTodo.save().then(function(doc){
    console.log(JSON.stringify(doc, undefined, 2));
},function(err){
    console.log(err);
});



var user = new User({
    email: "brenno.tondato@gmail.com"
});


user.save().then(function(value){
    console.log('User saved', value);
}, function(err){
    console.log(err);
});
*/

var app = express();

app.use(bodyParser.json());

const port = process.env.PORT;

//Module to post some todo on database
app.post('/todos', authenticate,function(req, res){
    //console.log(req.body.text);

    var todo = new Todo({
        name: req.body.text,
        _creator: req.user._id
    });

    todo.save().then(function(doc){
        res.send(doc);
    }, function(err){
        res.status(400).send(err);
    });
});

//Module to get all todo at once
app.get('/todos', authenticate,function(req, res){
    Todo.find({
        _creator: req.user._id
    }).then(function(todos){
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    })
});

// Module to send a random number and data (simulating a temperature datalogger)
app.get('/temp', function (req, res) {
    var temp =  Math.random() * (12 - 2) + 2;
    var time = new Date().toString();
    res.send({labels: time, series:temp})
});

//Module to get a todo by ID
app.get('/todos/:id', authenticate, function(req, res){
    const id = req.params.id;

    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById({
        _id:id,
        _creator: req.user._id
    }).then(function(todo){
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch(function(err){
        res.status(400).send();
    })
});

//Module to get a todo by name
/*
app.get('/todos/:name', (req, res) =>{
   console.log(req.params.name);
});
*/

//Module to delete todo found by id
app.delete('/todos/:id', authenticate,(req, res)=>{
   const id = req.params.id;

   if (!ObjectID.isValid(id)){
       return res.status(404).send();
   }

   Todo.findOneAndRemove({
       _id:id,
       _creator: req.user._id
   }).then((todo)=>{
       if(!todo){
           return res.status(404).send();
       }
       res.send({todo});
   }).catch((err)=>{
       res.status(404).send();
   });

});

//Module to update a todo found by id
app.patch('/todos/:id', authenticate,(req, res)=>{
    const id = req.params.id;
    var body = _.pick(req.body, ['name', 'Completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.Completed) && body.Completed){
        body.CompletedAt = new Date().getTime();
    }else{
        body.Completed = false;
        body.CompletedAt = null;
    }

    Todo.findOneAndUpdate({
        _id:id,
        _creator:req.user._id
    }, {$set: body}, {new: true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err)=>{
        res.status(404).send();
    });
});

//Module to post a new user
app.post('/users', (req, res) =>{
    var body  = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    //console.log(user)

    user.save().then(() => {
        // console.log(user.generateAuthToken())
        return user.generateAuthToken();
    }).then((token) =>{
        res.header('x-auth', token).send(user);
    }).catch(err => {
        res.status(400).send(err);
    })
});

//Module to get a user using Token and Id
app.get('/users/me',authenticate ,(req, res) => {
    res.send(req.user)
});

//Module to user login on API
app.post('/users/login', (req, res) => {
    let body  = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) =>{
        return user.generateAuthToken().then(token =>{
            res.header('x-auth', token).send(user);
        })
    }).catch((err) =>{
        res.status(400).send();
    });
});

//Module to user Log out of API
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }).catch((err)=>{
        res.status(400).send();
    })
});

app.listen(port, function(){
   console.log('Server listening on port: ' + port);
});

module.export = {app};