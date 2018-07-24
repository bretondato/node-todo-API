const mongoose  = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    nome:{
        type: String,
        require: true,
        trim: true,
        minlength: 2
    },

    funcao:{
        type: String,
        require: true,
        minlength: 3
    },

    email:{
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },

    password: {
        type: String,
        require: true,
        minlength: 6
    },

    estacao:{
        type: String,
        require: true
    },

    tokens:[{
        access:{
            type: String,
            require: true
        },
        token:{
            type: String,
            require: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken = function (token) {
    const User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject()
    }

    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
};

UserSchema.pre('save', function (next)  {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }

});

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
      if (!user){
          return Promise.reject();
      }

      // Aqui foi adicionado mais uma promise pois o mod bcrypt só funciona com callbacks
      // para retornar o resultado da função compare adicionamos este dentro de uma nova promisse

      return new Promise((resolve, reject) =>{
          bcrypt.compare(password, user.password, (err, res)=>{
              if (res){
                  resolve(user);
              }else {
                  reject();
              }
          })
      })
  })

};

UserSchema.methods.removeToken = function (token) {
  var user  = this;

  return user.update({
      $pull:{
          tokens:{token}
      }
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};