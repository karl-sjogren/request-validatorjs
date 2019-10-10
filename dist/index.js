"use strict";
/**
 * Copyright 2019 Elias Renman

 Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

 THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS.
 IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
 WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Rule_1 = require("./Rules/Rule");
exports.Rule = Rule_1.Rule;
var RecommendedRules_1 = require("./Rules/RecommendedRules");
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
        this.rules = [
            new RecommendedRules_1.Required()
        ];
        (_a = this.rules).push.apply(_a, rules);
    }
    /**
     * Validates A request.
     * @param {Object} data Json object containing
     * @param {Object} validation
     */
    RequestValidator.prototype.validate = function (data, validation) {
        var errors = [];
        for (var key in validation) {
            // @ts-ignore
            var sRule = validation[key];
            var rules = this._parseRules(sRule);
            // @ts-ignore
            var error = this._loopRules(rules, key, data[key]);
            if (error) {
                errors.push({ "field": key, "error": error });
            }
            // Validate all data after the specified rules in the validation object array
            // figure out what rules are what.
        }
        return errors;
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
        var ret = null;
        rules.forEach(function (element) {
            if (!element.passes(data)) {
                // @ts-ignore
                ret += element.message(name);
                return;
            }
        });
        return ret;
    };
    /**
     * Parses the rules from a string to a array of Rule objects.
     *
     * @param string_rules rules as a string.
     * @return {Rule[]} instantiated rules in a array.
     */
    RequestValidator.prototype._parseRules = function (string_rules) {
        var rules = string_rules.split('|');
        var rules_array = [];
        var self = this;
        rules.forEach(function (element) {
            var ret = self._getRule(element);
            if (ret) {
                // @ts-ignore
                rules_array.push(ret);
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
        name = name.split(':')[0];
        var value = name.split(':')[1];
        var ret;
        this.rules.forEach(function (element) {
            if (element.getName() == name) {
                if (value)
                    element.setValues(value);
                ret = element;
                return;
            }
        });
        if (ret)
            return ret;
        return false;
    };
    return RequestValidator;
}());
exports.RequestValidator = RequestValidator;
