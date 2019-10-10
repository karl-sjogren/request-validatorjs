
import {RequestValidator} from "../index";

let request = new RequestValidator();

let data: {} = {
    'token': 'ThisExists',
    'username': 'ThisExists',
    'email': 'ThisExists@mail.com',
};

let validation: {} = {
    'token': 'required',
    'username': 'required',
};

request.validate(data, validation);