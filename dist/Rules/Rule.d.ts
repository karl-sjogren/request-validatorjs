/**
 * Abstract Super class for a Rule.
 * Extend this class to create custom rules.
 * Pass custom rule in constructor of RequestValidator.
 */
export declare class Rule {
    private name;
    values: any;
    private variable;
    errorMessage: string;
    /**
     * Initiates a new Rule class object with a name.
     * @param {string} name
     */
    constructor(name: string);
    /**
     * Validates a specified variable against a rule.
     *
     * @param {*} variable
     * @param {string} name string name of variable.
     * @return {boolean | string} boolean if the validation is successful else a message message as string.
     */
    validate(variable: any, name: string): string | true;
    /**
     *  Rules validation passes that returns a boolean depending on the outcome of the expression.
     *
     * @param variable
     * @returns {boolean} true if validation passes else false.
     */
    passes(variable: any): boolean;
    /**
     * Returns a Validation message with a string message.
     *
     * If the error message contains any of the following placeholders they will be replaced.
     * :attribute will be replaced with the fields name.
     * :param will be replaced with the parameter in the rule, for example max:3, param = 3.
     * :value will be replaced by the actual input value of the field.
     *
     * @param {string} name of the passed variable.
     * @return {string} message message as string.
     * @throws {Error} if method is called in child class without overriding it first.
     */
    message(name: string): string;
    /**
     * Sets this.name
     * @param {string} name rules name
     */
    setName(name: string): void;
    /**
     * Sets the error message to a custom error message.
     * Certain placeholders can be apart of the error message see:
     * @see message for details.
     *
     * @param value the new error message.
     */
    setErrorMessage(value: string): void;
    /**
     * Binds a value to the private variable values.
     * This will be used if the Rule needs input variables.
     * For example max length == 10.
     *
     * @param {*} values input values, currently any type. may change in the future.
     */
    setValues(values: any): void;
    /**
     * Gets rules name.
     * @returns {string} this rules name.
     */
    getName(): string;
}
