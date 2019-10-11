/**
 * Copyright 2019 Elias Renman

 Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

 THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS.
 IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
 WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

import {Rule} from "./Rules/Rule";
import {RecommendedRules} from "./Rules/RecommendedRules";
import * as _ from 'lodash';

/**
 * This Class will Validate Requests.
 */
class RequestValidator {
    private rules: Rule[];

    /**
     * Initiates the Request Validator object
     *
     * @param {Rule[]} rules Array of additional rule classes to be registered in the validator.
     */
    constructor(rules: Rule[] = []) {
        this.rules = [];
        this.rules.push(...RecommendedRules, ...rules);
    }

    /**
     * Validates A request and returns a object list of all errors indexed by their key name.
     *
     * @param {Object} data Json object containing
     * @param {Object} validation
     * @param {Object} custom_errors contains custom error messages
     * @return {Object} returns all error messages as collection.
     */
    validate(data: any, validation: {}, custom_errors: any = {}) {
        let errorsCollection: any = {};
        _.forEach(validation, (value: string, key: string) => {
            let bail: any = this._checkBail(value);
            value = bail[1];

            let rules: Rule[] = this._parseRules(value, custom_errors);
            let errors = this._loopRules(rules, key, data[key], bail[0]);
            if (errors) errorsCollection[key] = {errors};
        });

        return {"messages": errorsCollection};
    }

    /**
     * Checks if a bail parameter is present.
     * If it is preset in will be replaced cut out of the string and returned as the first index.
     *
     * @param value input value
     * @return {any} returns array with two indexes, bail if present in the first and
     * @private
     */
    private _checkBail(value: string) {
        let bail = value.split("bail|");
        if (bail.length > 1) {
            return [true, bail[1]];
        } else return [false, bail[0]];
    }

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
    private _loopRules(rules: Rule[], name: string, data: string, bail: boolean) {
        let message: string[] = [];
        _.forEach(rules, (rule: Rule) => {
            if (!rule.passes(data)) {
                message.push(rule.message(name));
                if (bail) return false;
            }
        });
        return (message.length == 0) ? null : message;
    }

    /**
     * Parses the rules from a string to a array of Rule objects.
     *
     * @param string_rules rules as a string.
     * @param custom_errors contains custom error messages
     * @return {Rule[]} instantiated rules in a array.
     */
    private _parseRules(string_rules: string, custom_errors: any = {}) {
        let rules: string[] = string_rules.split('|');
        let rules_array: Rule[] = [];
        rules.forEach((sRule: string) => {
            let rule = this._getRule(sRule);
            if (rule) {
                let message = custom_errors[rule.getName()];
                if (message) rule.setErrorMessage(message);
                rules_array.push(rule);
            }
        });
        return rules_array;
    }

    /**
     * Gets a rule specified by the name.
     *
     * @param name lookup name.
     * @returns {Rule | boolean} rule object or false if there is no project with specified name.
     */
    private _getRule(name: string) {
        let rule_name = name.split(':')[0];
        let rule: Rule | undefined = _.find(this.rules, (el: Rule) => {
            return el.getName() == rule_name;
        });
        if (rule) {
            rule.setValues(name.split(':')[1]);
            return rule;
        }
        return false;
    }
}


export {
    RequestValidator,
    Rule,
};