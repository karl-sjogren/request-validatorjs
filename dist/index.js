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
     * Validates A request.
     *
     * @param {Object} data Json object containing
     * @param {Object} validation
     */
    RequestValidator.prototype.validate = function (data, validation) {
        var _this = this;
        var errors = {};
        _.forEach(validation, function (value, key) {
            var rules = _this._parseRules(value);
            var error = _this._loopRules(rules, key, data[key]);
            if (error)
                errors[key] = { error: error };
        });
        return { "messages": errors };
    };
    /**
     * Loops through all the Rules and checks if the data passes that rule.
     * If a test does not pass it returns the first error encountered.
     *
     * @param {Rule[]} rules array
     * @param {string} name
     * @param {string} data
     * @return {string | null} Returns a string error message or null if all rules pass.
     */
    RequestValidator.prototype._loopRules = function (rules, name, data) {
        var message = '';
        _.forEach(rules, function (rule) {
            if (!rule.passes(data)) {
                message += rule.message(name);
                return false;
            }
        });
        return (message == '') ? null : message;
    };
    /**
     * Parses the rules from a string to a array of Rule objects.
     *
     * @param string_rules rules as a string.
     * @return {Rule[]} instantiated rules in a array.
     */
    RequestValidator.prototype._parseRules = function (string_rules) {
        var _this = this;
        var rules = string_rules.split('|');
        var rules_array = [];
        rules.forEach(function (rule) {
            var error = _this._getRule(rule);
            if (error) {
                rules_array.push(error);
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
