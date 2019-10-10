/**
 * Copyright 2019 Elias Renman

 Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

 THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS.
 IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
 WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */


import {Required} from './Rules/Required';
import {Rule} from "./Rules/Rule";

/**
 * Will Validate Requests.
 */
class RequestValidator {
    private rules: Rule[];

    /**
     *
     * @param {Rules[]=} rules Array of additional rule classes to be registered in the validator.
     */
    constructor(rules = undefined) {
        this.rules = [
            new Required()
        ]
    }

    /**
     * Validates
     * @param {Object} data Json object containing
     * @param {Object} validation
     */
    validate(data: object, validation: {}) {
        console.log(data);

        for (let key in validation) {
            // @ts-ignore
            let value = validation[key];
            console.log(key, value);
            // Use `key` and `value`
        }
        // Validate all data after the specified rules in the validation object array
        // figure out what rules are what.
    }

    /**
     * Parses the rules from a string to a array of Rule objects.
     *
     * @param string_rules rules as a string.
     * @private
     * @return {Rule[]} instantiated rules in a array.
     */
    _parseRules(string_rules: string) {
        let rules: string[] = string_rules.split('|');
        let rules_array: Rule[] = [];
        let self = this;
        rules.forEach((element: string) => {
            let ret = self._getRule(element);
            console.log(ret)
            // @ts-ignore
            rules_array.push(ret);
        });

        return rules_array;
        // parse and return all relevant rule classes
    }

    /**
     * Gets a rule specified by the name.
     *
     * @param name lookup name.
     * @returns {Rule} rule object.
     * @throws {Error} if a rule is not found.
     */
    _getRule(name: string) {
        this.rules.forEach((element: Rule) => {
            if (element.getName() === name) return element;
        });
        throw new Error('Error this rule does not exist');
    }

}


export {
    RequestValidator,
    Rule,
};