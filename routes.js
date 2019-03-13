require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var User = require('./UserModel');
var JWT_SECRET = process.env.JWT_SECRET;


var app = express();
//Using body-parser middleware

//Parse application/x-www-form-urlencoded body from POST
app.use(bodyParser.urlencoded({
    extended: true
  }));

//Parse application/json body from POST
app.use(bodyParser.json());


app.post('/user/createUser', function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    User.addUser(email, password, function(addSuccess, errMsg){
        if (!addSuccess)
            return res.status(400).send({message: errMsg });
        else {
            var token = jwt.sign(
                {id: email},
                JWT_SECRET, {
                expiresIn: '24h',
                });
            return res.status(200).send({token});
        }
    });
});

//TODO
app.post('/user/loginUser', function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    User.loginUser(email, password, function(loginSuccess, errMsg){
        if (!loginSuccess)
            return res.status(403).send({message: errMsg });
        else {
            var token = jwt.sign(
                {id: email},
                JWT_SECRET, {
                expiresIn: '24h',
                });
            return res.status(200).send({token});
        }
    });
});

//TODO
app.put('/user/addSecret', function(req, res){
    var token = req.body.token;
    var secret = req.body.secret;
    jwt.verify(token, JWT_SECRET, (errMsg, decoded) => {
        console.log(errMsg, decoded, token, secret)
        if (errMsg) {
            return res.status(403).send({message: errMsg });
        } else {
            var email = decoded["id"]
            User.addSecret(email, secret, function(addSuccess, errMsg){
                if (!addSuccess){
                    return res.status(403).send({message: errMsg });
                }
                return res.status(200).send();
            });
        }
    });
});

//TODO
app.get('/user/guessSecret', function(req, res){
    return res.status(500).send("Not Implemented");
});


var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});
