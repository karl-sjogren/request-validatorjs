/**
 * Abstract Super class for a Rule.
 * Extend this class to create custom rules.
 * Pass custom rule in constructor of RequestValidator.
 */
export declare class Rule {
    private name;
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
    validate(variable: any, name: string): true | void;
    /**
     *  Rules validation passes that returns a boolean depending on the outcome of the expression.
     *
     * @param variable
     * @returns {boolean} true if validation passes else false.
     * @throws {Error} if method is called in child class without overriding it first.
     */
    statement(variable: any): void;
    /**
     * Returns a Validation message with a string message.
     *
     * @param {string} name of the passed variable.
     * @return {string} message message as string.
     * @throws {Error} if method is called in child class without overriding it first.
     */
    error(name: string): void;
    /**
     * Sets this.name
     * @param {string} name rules name
     */
    setName(name: string): void;
    /**
     * Gets rules name.
     * @returns {string} this rules name.
     */
    getName(): string;
}