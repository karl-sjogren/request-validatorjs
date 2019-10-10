"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var request = new index_1.RequestValidator();
var data = {
    'token': 'ThisExists',
    'username': 'ThisExists',
    'email': 'ThisExists@mail.com',
};
var validation = {
    'token': 'required',
    'username': 'required',
};
request.validate(data, validation);
