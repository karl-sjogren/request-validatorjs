"use strict";
/**
 * Copyright 2019 Elias Renman

 Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

 THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS.
 IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
 WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Rule_1 = require("./Rules/Rule");
exports.Rule = Rule_1.Rule;
var RecommendedRules_1 = require("./Rules/RecommendedRules");
var _ = require("lodash");
/**
 * This Class will Validate Requests.
 */
var RequestValidator = /** @class */ (function () {
    /**
     * Initiates the Request Validator object
     *
     * @param {Rule[]} rules Array of additional rule classes to be registered in the validator.
     */
    function RequestValidator(rules) {
        var _a;
        if (rules === void 0) { rules = []; }
        this.rules = [];
        (_a = this.rules).push.apply(_a, __spreadArrays(RecommendedRules_1.RecommendedRules, rules));
    }
    /**
     * Validates A request and returns a object list of all errors indexed by their key name.
     *
     * @param {Object} data Json object containing
     * @param {Object} validation
     * @param {Object} custom_errors contains custom error messages
     * @return {Object} returns all error messages as collection.
     */
    RequestValidator.prototype.validate = function (data, validation, custom_errors) {
        var _this = this;
        if (custom_errors === void 0) { custom_errors = {}; }
        var errorsCollection = {};
        _.forEach(validation, function (value, key) {
            var bail = _this._checkBail(value);
            value = bail[1];
            var rules = _this._parseRules(value, custom_errors);
            var errors = _this._loopRules(rules, key, data[key], bail[0]);
            if (errors)
                errorsCollection[key] = { errors: errors };
        });
        return { "messages": errorsCollection };
    };
    /**
     * Checks if a bail parameter is present.
     * If it is preset in will be replaced cut out of the string and returned as the first index.
     *
     * @param value input value
     * @return {any} returns array with two indexes, bail if present in the first and
     * @private
     */
    RequestValidator.prototype._checkBail = function (value) {
        var bail = value.split("bail|");
        if (bail.length > 1) {
            return [true, bail[1]];
        }
        else
            return [false, bail[0]];
    };
    /**
     * Loops through all the Rules and checks if the data passes that rule.
     * If a test does not pass it returns the first error encountered.
     *
     * @param {Rule[]} rules array
     * @param {string} name the name of the key in the object
     * @param {string} data the entire object
     * @param {boolean} bail if bail is true then only one the first error will be returned.
     * @return {string[] | null} Returns a string array with error messages or null if all rules pass.
     */
    RequestValidator.prototype._loopRules = function (rules, name, data, bail) {
        var message = [];
        _.forEach(rules, function (rule) {
            if (!rule.passes(data)) {
                message.push(rule.message(name));
                if (bail)
                    return false;
            }
        });
        return (message.length == 0) ? null : message;
    };
    /**
     * Parses the rules from a string to a array of Rule objects.
     *
     * @param string_rules rules as a string.
     * @param custom_errors contains custom error messages
     * @return {Rule[]} instantiated rules in a array.
     */
    RequestValidator.prototype._parseRules = function (string_rules, custom_errors) {
        var _this = this;
        if (custom_errors === void 0) { custom_errors = {}; }
        var rules = string_rules.split('|');
        var rules_array = [];
        rules.forEach(function (sRule) {
            var rule = _this._getRule(sRule);
            if (rule) {
                var message = custom_errors[rule.getName()];
                if (message)
                    rule.setErrorMessage(message);
                rules_array.push(rule);
            }
        });
        return rules_array;
    };
    /**
     * Gets a rule specified by the name.
     *
     * @param name lookup name.
     * @returns {Rule | boolean} rule object or false if there is no project with specified name.
     */
    RequestValidator.prototype._getRule = function (name) {
        var rule_name = name.split(':')[0];
        var rule = _.find(this.rules, function (el) {
            return el.getName() == rule_name;
        });
        if (rule) {
            rule.setValues(name.split(':')[1]);
            return rule;
        }
        return false;
    };
    return RequestValidator;
}());
exports.RequestValidator = RequestValidator;
