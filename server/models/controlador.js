var mongoose = require('mongoose');

//Descobrir como a camera envia os dados para o web service

var Controlador = mongoose.model('Controlador', {
    nome:{
        type:String,
        require: true,
        minlength: 1,
        trim: true
    },

    estado_entrada:{
        type: Boolean,
        require: true,
        default: false
    },

    estado_saida:{
        type: Boolean,
        require: true,
        default: false
    },

    estado_fora_servico:{
        type: Boolean,
        require: true,
        default: false
    },

    Fonte:{
        estado_alimentacao:{
            type: Number,
            require: true
        }
    },

    Porta:{
        ip:{
            type:String,
            require: true
        },
        estado_conexao:{
            type: String,
            require: true
        }
    },

    Sensores:[{
        Sensor:{
            id:{
                type: mongoose.Schema.Types.ObjectId,
                require: true
            },
            estado:{
                type: Boolean,
                require: true
            }
        }

    }],
});

module.exports = {Controlador};