const expect  = require('expect');
const request  = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todos');

beforeEach((done)=>{
    Todo.remove({}).then(function(){
        done();
    })
});

describe('POST /Todos', () => {
   it('Should create a new todo', (done) =>{
       var text = 'Test todo text';

       request(app).post('/todos')
           .send({text})
           .expect(200)
           .expect((res)=>{
               expect(res.body.text).toBe(text);
           }).end((err, res) => {
           if (err) {
               return done(err);
           }
           Todo.find.then((todos) => {
               expect(todos.length).toBe(1);
               expect(todos[0].text).tobe(text);
               done();
           }).catch((err) => done(err));
       });
   });

   it('should not create todo with invalid data', function (done){
       request(app).post('/todos')
           .send({})
           .expect(400)
           .end(function (err, res){
               if(err){
                   return done(err);
               }

               Todo.find().then(function(todos){
                  expect(todos.length).toBe(0);
                  done();
               }).catch(function(err){done(err)});
           })
   })
});