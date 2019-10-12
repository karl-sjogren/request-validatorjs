/**
 * Copyright 2019 Elias Renman

 Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

 THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS.
 IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
 WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
import { Rule } from "./Rules/Rule";
/**
 * This Class will Validate Requests.
 */
declare class RequestValidator {
    private rules;
    /**
     * Initiates the Request Validator object
     *
     * @param {Rule[]} rules Array of additional rule classes to be registered in the validator.
     */
    constructor(rules?: Rule[]);
    /**
     * Validates A request and returns a object list of all errors indexed by their key name.
     *
     * @param {Object} data Json object containing
     * @param {Object} validation
     * @param {Object} custom_errors contains custom error messages
     * @return {Object} returns all error messages as collection.
     */
    validate(data: any, validation: {}, custom_errors?: any): {
        "errors": any;
    };
    /**
     * Checks if a bail parameter is present.
     * If it is preset in will be replaced cut out of the string and returned as the first index.
     *
     * @param value input value
     * @return {any} returns array with two indexes, bail if present in the first and
     * @private
     */
    private _checkBail;
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
    private _loopRules;
    /**
     * Parses the rules from a string to a array of Rule objects.
     *
     * @param string_rules rules as a string.
     * @param custom_errors contains custom error messages
     * @return {Rule[]} instantiated rules in a array.
     */
    private _parseRules;
    /**
     * Gets a rule specified by the name.
     *
     * @param name lookup name.
     * @returns {Rule | boolean} rule object or false if there is no project with specified name.
     */
    private _getRule;
}
export { RequestValidator, Rule, };
