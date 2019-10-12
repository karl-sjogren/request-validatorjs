# Request Validator
A Node.js module for validating any kind of js dictionary.
Inspired by the Request Validation feature in [laravel](https://laravel.com/docs/5.8/validation).
 
## Installation 
```sh
npm install request-validator
```
## Usage
Some simple examples of usages of this package.
### Example payload
A example data payload looks like this
```JSON
{
  "token": "",
  "someValue": "This has a value",
  "aInt": 0,
  "mayNotBeNull": null
}
```

### Javascript
```javascript
var RequestValidator = require('request-validator');
var request = new RequestValidator();
let errors = request.validate(data,{
    'token': 'required|max:255',
    'mayNotBeNull': 'required|notNull',
    'doesNotExistInData': 'required',
    });
```
### TypeScript
```typescript
import { RequestValidator } from 'request-validator';
let request = new RequestValidator();
let errors = request.validate(data,{
    'token': 'required|max:255',
    });
```
Example print of errors as defined in javascript.
```json
{
    "messages": {
        "aInt": [
            "token is required!"
        ],
        "someValue": [
                "someValue is required to be a minimum length of 15"
        ]
    }
}
```
### Using custom error messages

A example for 
```javascript
var data = {
    "name": "example",

};

var custom_errors = {
    //Custom error message for the rule called "username"
    "username": "field :attribute with the value :value is not a valid username!"
};

var validation = {
    /* This will validate that the field name exists and that it is not empty and that it is a valid username */
    "name": "required|username",
}

// In this example no errors will be present since example is a vaild username.
var response = request.validate(data, validation, custom_errors);
```
Above example with the data field "name" being a invalid username,<br> 
example: "invalid username" contains spaces which is not allowed. <br>
The output would looks like this.
```JSON
{
    "errors": {
        "name": [
             "field name with the value invalid username is not a valid username!"
        ]
    }
}
```
## Rules
### Available rules
For a list of currently available rule see [RULES](https://github.com/Abborren/request-validatorjs/blob/master/RULES.MD) <br>
A quick reference for the rules are:
* required
* min:int
* max:int
* boolean
* string
* email
* url
* json
* username

### Writing custom rules

For writing custom rules there a simple placeholder values that should be place in the errorMessage string. the available placeholders: <br>
 :attribute will be replaced with the fields name.<br>
 :param will be replaced with the parameter in the rule, for example max:3, param = 3.<br>
 :value will be replaced by the actual input value of the field.     
## Test
Running the mocha unit tests are done by running the following command:
```sh
npm run test
```
