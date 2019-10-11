'use strict'

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
        let expected = {
            "messages": {
                "something_else": {
                    "error": "something_else is required!"
                }
            }
        };

        expect(response).to.eql(expected);
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
        let expected = {
            "messages": {
                "something_else": {
                    "error": "something_else is required!"
                }
            }
        };
        expect(response).to.eql(expected);
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
        let expected = {
            messages: {
                aInt: {error: 'aInt has a maximum allowed length of 3'},
                someValue: {error: 'someValue has a maximum allowed length of 5'}
            }
        };

        expect(response).to.eql(expected);
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

        let expected = {
            messages:
                {
                    aInt: {error: 'aInt requires a minimum length of 4'},
                    someValue: {error: 'someValue requires a minimum length of 15'}
                }
        };
        expect(response).to.eql(expected);
    });

    it('should test a invalid email', () => {
        var request = new requestValidator();
        let data = {
            "email": "some@value.",

        };

        let response = request.validate(data, {
            "email": "required|email",
        });
        let expected = {messages: {email: {error: 'email is not a valid email!'}}};
        expect(response).to.eql(expected);
    });

    it('should test a valid email', () => {
        var request = new requestValidator();
        let data = {
            "email": "some@value.com",

        };

        let response = request.validate(data, {
            "email": "required|email",
        });

        let expected = {messages: {}};
        expect(response).to.eql(expected);
    });

    it('should test a valid json', () => {
        var request = new requestValidator();
        let data = {
            "json": '{"messages": {"email": {"error": "email is not a valid email!"}}}',

        };

        let response = request.validate(data, {
            "json": "required|json",
        });

        let expected = {messages: {}};
        expect(response).to.eql(expected);
    });
});