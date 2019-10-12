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
            "errors": {
                "something_else": [
                    "something_else is required!",
                ]
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
            "errors": {
                "something_else": [
                    "something_else is required!"
                ]
            }
        };
        expect(response).to.eql(expected);
    });

})
;


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
            "errors": {
                "aInt": [
                    "aInt is required to be a maximum length of 3"
                ],
                "someValue": [
                    "someValue is required to be a maximum length of 5"
                ]
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
            "errors": {
                "aInt": [

                    "aInt is required to be a minimum length of 4"
                ],
                "someValue": [
                    "someValue is required to be a minimum length of 15"
                ]
            }
        };
        expect(response).to.eql(expected);
    });

    it('should return multiple rule violations', () => {
        var request = new requestValidator();
        let data = {
            "token": "some value",
            "someValue": "test",
            "aInt": 0,

        };

        let response = request.validate(data, {
            "aInt": "required|min:4|max:10",
            "someValue": "required|min:15",
        });

        let expected = {
            "errors": {
                "aInt": [
                    "aInt is required!",
                    "aInt is required to be a minimum length of 4"
                ],
                "someValue": [
                    "someValue is required to be a minimum length of 15"
                ]
            }
        };
        expect(response).to.eql(expected);
    });

    it('should return one error on aInt because bail rule is set', () => {
        var request = new requestValidator();
        let data = {
            "token": "some value",
            "someValue": "test",
            "aInt": 0,

        };

        let response = request.validate(data, {
            "aInt": "bail|required|min:4|max:10",
            "someValue": "required|min:15",
        });

        let expected = {
            "errors": {
                "aInt": [
                    "aInt is required!",
                ],
                "someValue": [
                    "someValue is required to be a minimum length of 15",
                ]

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
        let expected = {
            "errors": {
                "email": [
                    "Invalid email address!"
                ]
            }
        };
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

        let expected = {"errors": {}};
        expect(response).to.eql(expected);
    });

    it('should test a valid json', () => {
        var request = new requestValidator();
        let data = {
            "json": '{"errors": {"email": {"errors": "email is not a valid email!"}}}',

        };

        let response = request.validate(data, {
            "json": "required|json",
        });

        let expected = {"errors": {}};
        expect(response).to.eql(expected);
    });

    it('should test a valid username', () => {
        var request = new requestValidator();
        let data = {
            "username": "testUsername",

        };

        let response = request.validate(data, {
            "username": "required|username",
        });

        let expected = {"errors": {}};
        expect(response).to.eql(expected);
    });

    it('should test a invalid username', () => {
        var request = new requestValidator();
        let data = {
            "username": "testUsernameÖ",

        };

        let response = request.validate(data, {
            "username": "required|username",
        });

        let expected = {
            "errors": {
                "username": [
                    "Invalid username!",
                ]
            }
        };
        expect(response).to.eql(expected);
    });

    it('should test a invalid username with custom error message', () => {
        var request = new requestValidator();
        let data = {
            "username": "Invalid usernameÖ",

        };

        let custom_errors = {
            "username": ':attribute is not a username! :value'
        };

        let response = request.validate(data, {
            "username": "required|username",
        }, custom_errors);

        let expected = {
            "errors": {
                "username": [

                    "username is not a username! Invalid usernameÖ"
                ]
            }
        };
        expect(response).to.eql(expected);
    });

    it('should test a invalid length with custom error message', () => {
        var request = new requestValidator();
        let data = {
            "username": "testUsernameThatIsToLong",
        };

        let custom_errors = {
            "username": ':attribute is not a username! :value',
            "max": ":attribute has a maximum allowed length of :param",
        };

        let response = request.validate(data, {
            "username": "required|username|max:15",
        }, custom_errors);

        let expected = {
            "errors": {
                "username": [
                    "username has a maximum allowed length of 15"
                ]
            }
        };

        expect(response).to.eql(expected);
    });
});