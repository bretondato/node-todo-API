//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//Destruction test
/*
var user  = {name: "Brenno", age: 22};
var {name} = user;
console.log(name);
*/

//Creating a Id test
/*
var obj = new ObjectID();
console.log(obj);
*/


MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, client) {
   if (err){
       console.log('Unable to connect to MongoDB server');
   }
   console.log('Connect to MongoDB server');
   const db = client.db('TodoApp');

   /*
   db.collection('Todos').insertOne({
      text:'Something to do',
      completed: false
   }, function (err, result) {
       if(err){
           console.log('Unable to insert todo', err);
       }
       console.log(JSON.stringify(result.ops, undefined, 2));
   });
    */

   /*
   db.collection('Users').insertOne({
       name: 'Rodrigo F. Maia',
       age: '45',
       location: '1234890'
   }, function (err, res) {
       if(err){
           console.log('Unable to insert user', err);
       }
       console.log(res.ops[0]._id.getTimestamp());
   });
    client.close();
    */
});