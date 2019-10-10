'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js').RequestValidator;
var requestValidator = index.RequestValidator;
var rule = index.Rule;

describe('RequestValidaor testing', () => {
    it('should Return at least one rule', () => {
        var result = new requestValidator();
        expect(result.rules.length > 0);
    });

});