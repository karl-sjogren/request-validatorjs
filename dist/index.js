"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Required_1 = require("./Rules/Required");
var Rule_1 = require("./Rules/Rule");
exports.Rule = Rule_1.Rule;
/**
 * Will Validate Requests.
 */
var RequestValidator = /** @class */ (function () {
    /**
     *
     * @param {Rules[]=} rules Array of additional rule classes to be registered in the validator.
     */
    function RequestValidator(rules) {
        if (rules === void 0) { rules = undefined; }
        this.rules = [
            new Required_1.Required()
        ];
    }
    /**
     * Validates
     * @param {Object} data Json object containing
     * @param {Object} validation
     */
    RequestValidator.prototype.validate = function (data, validation) {
        console.log(data);
        for (var key in validation) {
            // @ts-ignore
            var value = validation[key];
            console.log(key, value);
            // Use `key` and `value`
        }
        // Validate all data after the specified rules in the validation object array
        // figure out what rules are what.
    };
    /**
     * Parses the rules from a string to a array of Rule objects.
     *
     * @param string_rules rules as a string.
     * @private
     * @return {Rule[]} instantiated rules in a array.
     */
    RequestValidator.prototype._parseRules = function (string_rules) {
        var rules = string_rules.split('|');
        var rules_array = [];
        var self = this;
        rules.forEach(function (element) {
            var ret = self._getRule(element);
            console.log(ret);
            // @ts-ignore
            rules_array.push(ret);
        });
        return rules_array;
        // parse and return all relevant rule classes
    };
    /**
     * Gets a rule specified by the name.
     *
     * @param name lookup name.
     * @returns {Rule} rule object.
     * @throws {Error} if a rule is not found.
     */
    RequestValidator.prototype._getRule = function (name) {
        this.rules.forEach(function (element) {
            if (element.getName() === name)
                return element;
        });
        throw new Error('Error this rule does not exist');
    };
    return RequestValidator;
}());
exports.RequestValidator = RequestValidator;
