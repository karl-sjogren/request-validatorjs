'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var requestValidator = index.RequestValidator;
var rule = index.Rule;

describe('RequestValidator testing', () => {

    it('should create a requestValidator object', () => {
        var result = new requestValidator();
        expect(typeof result === index.RequestValidator);
    });

    it('should Return at least one rule', () => {
        var result = new requestValidator();
        expect(result.rules.length > 0);
    });

    it('should Return message with something_else is required!', () => {
        var request = new requestValidator();
        let data = {
            "token": "some value",
            "someValue": "This has a value",
            "aInt": 0,
            "mayNotBeNull": null
        };

        let response = request.validate(data, {
            "token": "required",
            "something_else": "required",
        });
        console.log(response);
        expect(response === "{ something_else: 'nullsomething_else is required!' }");
    });

    it('should Return error message', () => {
        var request = new requestValidator();
        let data = {
            "token": "some value",
            "someValue": "This has a value",
            "aInt": 0,
            "mayNotBeNull": null,
            "something_else": ""
        };

        let response = request.validate(data, {
            "token": "required",
            "something_else": "required",
        });
        console.log(response);
        expect(response === "{ something_else: 'nullsomething_else is required!' }");
    });

});


describe('testing rules', () => {
    it('should return a maximum rule violation', () => {
        var request = new requestValidator();
        let data = {
            "token": "some value",
            "someValue": "This has a value",
            "aInt": 25,

        };

        let response = request.validate(data, {
            "aInt": "required|max:3",
            "someValue": "required|max:5",
        });
        expect(response == "{ messages:[ aInt: { error: 'aInt has a maximum allowed length of 3' },someValue: { error: 'someValue has a maximum allowed length of 5' } ] }");
    });

    it('should return a minimum rule violation', () => {
        var request = new requestValidator();
        let data = {
            "token": "some value",
            "someValue": "test",
            "aInt": 2,

        };

        let response = request.validate(data, {
            "aInt": "required|max:10|min:4",
            "someValue": "required|min:15",
        });
        console.log(response);
    });
});