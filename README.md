# HackUCI-Backend-Challenge

## To run  
Set up: 
`npm install`

Add environmental variables from sample.env

Run server: 
`node routes.js`

Runs on localhost:3000

## Documentation
Look at PostMan requests(hackuci-challenges.postman_collection.json) for examples  

[User](#User)

### User
**POST /user/createUser**  
Create user
```
PARAMS:
"token"                     : String # required
"secret"                    : String # required

RETURNS:
"token"                     : String
```

**POST /user/loginUser/**  
Login user
```
PARAMS:
"email"                     : String # required
"password"                  : String # required

RETURNS:
"token"                     : String
```

**PUT /user/addSecret**  
Add secret to user
```
PARAMS:
"jwt_token"                 : String # required
"secret"                    : String # required

RETURNS:
"status"                    : Response code
```

**GET /user/guessSecret/**  
Get specific user
```
PARAMS:
"email"                     : String # required
"secret"                    : String # required

RETURNS:
"guess accuracy"            : Boolean
```
