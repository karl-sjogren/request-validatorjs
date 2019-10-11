/**
 * Copyright 2019 Elias Renman

 Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

 THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS.
 IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
 WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

import {Rule} from "./Rules/Rule";
import {Required} from "./Rules/RecommendedRules";
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
        this.rules = [
            new Required()
        ];
        this.rules.push(...rules);
    }

    /**
     * Validates A request.
     * 
     * @param {Object} data Json object containing
     * @param {Object} validation
     */
    validate(data: any, validation: {}) {
        let errors: any = [];
        _.forEach(validation, (value: string, key: string)=> {
            let rules: Rule[] = this._parseRules(value);
            let error = this._loopRules(rules, key, data[key]);
            if (error) errors[key] = error;
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
        rules.forEach((rule: Rule) => {
            if (!rule.passes(data)) {
                message += rule.message(name);
                return;
            }
        });
        return (message == '') ? null : message;
    }

    /**
     * Parses the rules from a string to a array of Rule objects.
     *
     * @param string_rules rules as a string.
     * @return {Rule[]} instantiated rules in a array.
     */
    private _parseRules(string_rules: string) {
        let rules: string[] = string_rules.split('|');
        let rules_array: Rule[] = [];
        rules.forEach((rule: string) => {
            let error = this._getRule(rule);
            if (error) {
                rules_array.push(error);
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
        name = name.split(':')[0];
        let rule: Rule | undefined = _.find(this.rules, (el: Rule) => {
            return el.getName() == name;
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