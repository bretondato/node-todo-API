var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
    name:{
        type:String,
        require: true,
        minlength: 1,
        trim: true
    },
    Completed:{
        type:Boolean,
        default: false
    },
    CompletedAt:{
        type:Number,
        default: null
    },
    _creator:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
});

module.exports = {Todo};