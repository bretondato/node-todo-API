var mongoose = require('mongoose');

//Descobrir como a camera envia os dados para o web service

var Servidor = mongoose.model('Servidor', {
    nome:{
        type:String,
        require: true,
        minlength: 1,
        trim: true
    },
    temperatura:{
        type: Number,
        minlength: 1
    },
    Fontes:[{
        Fonte:{
            numero:{
                type: String,
                require: true
            },
            estado_alimentacao:{
                type: Boolean,
                require: true
            }
        }
    }],
    Portas:[{
        Porta:{
            ip:{
                type:String,
                require: true
            },
            estado_conexao:{
                type: Boolean,
                require: true
            },
            numero:{
                type: Number,
                require: true
            }
        }
    }]
});

module.exports = {Servidor};