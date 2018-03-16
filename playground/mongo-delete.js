//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, client) {
    if (err){
        console.log('Unable to connect to MongoDB server');
    }
    console.log('Connect to MongoDB server');
    const db = client.db('TodoApp');

    //DeleteMany
    /*
    db.collection('Todos').deleteMany({text:'buy milk'}).then(function (value) {
       console.log(value);
    }, function (reason) {
        console.log('Unable to fetch data');
    });
    */


    //deleteOne
    /*
    db.collection('Todos').deleteOne({text:'Walk with Mikka'}).then(function (value) {
        console.log(value);
    }, function (reason) {
        console.log('Unable to fetch data');
    });
    */

    //findOneAndDelete
    /*
    db.collection('Todos').findOneAndDelete({completed: false}).then(function (value) {
        console.log(value);
    }, function (reason) {
        console.log('Unable to fetch data', reason);
    });
    */

    db.collection('User').deleteMany({name: 'Rodrigo F. Maia'});


    db.collection('Users').deleteOne({_id: new ObjectID('5aa9cda19ce0e8261ea29a58')}).then(function (value) {
        console.log(JSON.stringify(value, undefined, 2));
    }, function (reason) {
        console.log('Unable to fetch data', reason);
    });


    client.close();
});