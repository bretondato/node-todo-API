//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, client) {
    if (err){
        console.log('Unable to connect to MongoDB server');
    }
    console.log('Connect to MongoDB server');
    const db = client.db('TodoApp');

    /*
    db.collection('Todos').find({
        _id: new ObjectID('5aa9cc61ff2a332618b58bac')
    }).toArray().then(function (value) {
        console.log('Todos');
        console.log(JSON.stringify(value, undefined, 2));

        }, function (reason) {
        console.log("Unable to fetch Todos", reason);
    });
    */

    /*
    db.collection('Todos').find().count().then(function (value) {
        console.log(`Todos cout ${value}`);
    }, function (reason) {
        console.log("Unable to fetch Todos", reason);
    });
    */

    db.collection('Users').find({name: 'Rodrigo F. Maia'}).count().then(function (value) {
        console.log(JSON.stringify(value, undefined, 2));
    }, function (reason) {
        console.log("Unable to fetch Todos", reason);
    });


});