import { Rule } from "./Rules/Rule";
/**
 * Will Validate Requests.
 */
declare class RequestValidator {
    private rules;
    /**
     *
     * @param {Rules[]=} rules Array of additional rule classes to be registered in the validator.
     */
    constructor(rules?: undefined);
    /**
     * Validates
     * @param {Object} data Json object containing
     * @param {Object} validation
     */
    validate(data: object, validation: {}): void;
    /**
     * Parses the rules from a string to a array of Rule objects.
     *
     * @param string_rules rules as a string.
     * @private
     * @return {Rule[]} instantiated rules in a array.
     */
    _parseRules(string_rules: string): Rule[];
    /**
     * Gets a rule specified by the name.
     *
     * @param name lookup name.
     * @returns {Rule} rule object.
     * @throws {Error} if a rule is not found.
     */
    _getRule(name: string): void;
}
export { RequestValidator, Rule, };
