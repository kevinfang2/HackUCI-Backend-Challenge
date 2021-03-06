var validator  = require('validator')

var UserModel = {};

var users = {};

// Adds a user with email and password, and passes success/failure to callback
UserModel.addUser = function(email, password, callback){
    if(!email || !validator.isEmail(email)){
        callback(false, "Email is ill-formed");
    }
    else if(email in users){
        callback(false, "Email already exists");
    }
    else if(!password){
        callback(false, "Password is ill-formed");
    }
    else{
        users[email] = { password };
        callback(true);
    }
};

UserModel.loginUser = function(email, password, callback){
    if (!(email in users)){
        callback(false, "Email not registered");
    }
    else if (users[email]["password"] === password){
        callback(true);
    }
    else{
        callback(false, "Invalid credentials");
    }
};

UserModel.addSecret = function(email, secret, callback){
  if (!(email in users)){
      callback(false, "Token User not registered");
  }
  else{
      users[email] = { secret };
      callback(true);
  }
};

UserModel.guessSecret = function(email, secret, callback){
  console.log(users)
  if (!(email in users)){
      callback(false, false, "User not found");
  }
  else if (!("secret" in users[email])){
      callback(false, false, "User has no secret");
  }
  else{
      if (users[email]["secret"] != secret){
          callback(true, false);
      }
      else{
          callback(true, true);
      }
  }
};

module.exports = UserModel;
