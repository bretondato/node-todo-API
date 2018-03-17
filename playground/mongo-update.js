//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, client) {
    if (err){
        console.log('Unable to connect to MongoDB server');
    }
    console.log('Connect to MongoDB server');
    const db = client.db('TodoApp');

    /*
    db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5aac8e816d604b0bce073a5c')}, {
        $set:{
            completed: true
        }
    },{
        returnOriginal: false
    }).then(function (value) {
        console.log(value);
    });
    */

    db.collection('Users').findOneAndUpdate({_id: new ObjectID('5aa9cd93cbe350261d78fbcc')}, {
        $set:{
            name: 'Brenno',
            age:'23'
        }
        },{
            returnOriginal:false
        }).then(function (value) { console.log(value) });

});