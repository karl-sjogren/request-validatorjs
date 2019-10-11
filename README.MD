# Request Validator
Currently under construction.

A Node.js module for validating any kind of js dictionary.
Inspired by the Request Validation feature in [laravel](https://laravel.com/docs/5.8/validation).
 
## Installation 
Not yet published on NPM!
```sh
npm install request-validator --save
```
## Usage
Some simple examples of usages of this package.
### Example payload
A example data payload looks like this
```JSON
{
  "token": "some value",
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
{"messages":
  {
    "doesNotExistInData": "doesNotExistInData is required!",
    "mayNotBeNull": "mayNotBeNull is required!"
  }
}
```
## Test
```sh
npm run test
```
