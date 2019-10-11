/**
 * Copyright 2019 Elias Renman

 Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

 THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS.
 IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
 WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

import {Rule} from "./Rules/Rule";
import { RecommendedRules } from "./Rules/RecommendedRules";
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
     * Validates A request.
     *
     * @param {Object} data Json object containing
     * @param {Object} validation
     * @param {Object} custom_errors contains custom error messages
     */
    validate(data: any, validation: {}, custom_errors: any = {}) {
        let errors: any = {};
        _.forEach(validation, (value: string, key: string)=> {
            let rules: Rule[] = this._parseRules(value, custom_errors);
            let error = this._loopRules(rules, key, data[key]);
            if (error) errors[key] = {error};
        });
        return {"messages": errors};
    }

    /**
     * Loops through all the Rules and checks if the data passes that rule.
     * If a test does not pass it returns the first error encountered.
     *
     * @param {Rule[]} rules array
     * @param {string} name
     * @param {string} data
     * @return {string | null} Returns a string error message or null if all rules pass.
     */
    private _loopRules(rules: Rule[], name: string, data: string) {
        let message: string = '';
        _.forEach(rules, (rule: Rule) => {
            if (!rule.passes(data)) {
                message += rule.message(name);
                return false;
            }
        });
        return (message == '') ? null : message;
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