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
        "aInt": {
            "errors": [
                "token is required!"
            ]
        },
        "someValue": {
            "errors": [
                "someValue is required to be a minimum length of 15"
            ]
        }
    }
}
```

### Writing custom rules
For writing custom rules there a simple placeholder values that should be place in the errorMessage string. the available placeholders:
 :attribute will be replaced with the fields name.<br>
 :param will be replaced with the parameter in the rule, for example max:3, param = 3.<br>
 :value will be replaced by the actual input value of the field.     
## Test
Running the mocha unit tests are done by running the following command:
```sh
npm run test
```
