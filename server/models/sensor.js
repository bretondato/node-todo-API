var mongoose = require('mongoose');

//Descobrir como a camera envia os dados para o web service

var Sensor = mongoose.model('sensor', {
    name:{
        type:String,
        require: true,
        minlength: 1,
        trim: true
    },
    status:{
        type: Boolean,
        require: true,
        default: false
    },
    passagens:{
        type: Number,
        require: true,
        minlength: 1,
        default: 0
    }
});

module.exports = {Sensor};