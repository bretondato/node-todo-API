const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

// Token creation and validation without JWT
/*
var message = 'I am use number 3';

var hash = SHA256(message).toString();


var data = {
    id: 4
};

var token= {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

// Man in the middle attack

// token.data.id = 5
// token.hash = SHA256(JSON.stringify(token.data)).toString();


var resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();

if (resultHash === token.hash) {
    console.log('Data was not changed');
}else {
    console.log('Data was changed. Do not trust !');
}
*/

// Token creation with JWT

var data = {
    id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token)

var decoded = jwt.decode(token, '123abc');
console.log(decoded)