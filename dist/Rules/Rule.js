"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Abstract Super class for a Rule.
 * Extend this class to create custom rules.
 * Pass custom rule in constructor of RequestValidator.
 */
var Rule = /** @class */ (function () {
    /**
     * Initiates a new Rule class object with a name.
     * @param {string} name
     */
    function Rule(name) {
        this.name = '';
        this.setName(name);
        if (this.constructor === Rule) {
            throw new Error('Cannot instantiate abstract class');
        }
    }
    /**
     * Validates a specified variable against a rule.
     *
     * @param {*} variable
     * @param {string} name string name of variable.
     * @return {boolean | string} boolean if the validation is successful else a message message as string.
     */
    Rule.prototype.validate = function (variable, name) {
        // @ts-ignore
        if (this.passes(variable))
            return true;
        return this.message(name);
    };
    /**
     *  Rules validation passes that returns a boolean depending on the outcome of the expression.
     *
     * @param variable
     * @returns {boolean} true if validation passes else false.
     * @throws {Error} if method is called in child class without overriding it first.
     */
    Rule.prototype.statement = function (variable) {
        throw new Error('Cannot call abstract method');
    };
    /**
     * Returns a Validation message with a string message.
     *
     * @param {string} name of the passed variable.
     * @return {string} message message as string.
     * @throws {Error} if method is called in child class without overriding it first.
     */
    Rule.prototype.error = function (name) {
        throw new Error('Cannot call abstract method');
    };
    /**
     * Sets this.name
     * @param {string} name rules name
     */
    Rule.prototype.setName = function (name) {
        if (/[\s|]/.test(name)) {
            throw new Error('Invalid naming format, please refrain from using spaces.');
        }
        this.name = name;
    };
    /**
     * Gets rules name.
     * @returns {string} this rules name.
     */
    Rule.prototype.getName = function () {
        return this.name;
    };
    return Rule;
}());
exports.Rule = Rule;
