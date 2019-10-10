/**
 * Abstract Super class for a Rule.
 * Extend this class to create custom rules.
 * Pass custom rule in constructor of RequestValidator.
 */
export class Rule {
    private name: string = '';
    private values: any = '';

    /**
     * Initiates a new Rule class object with a name.
     * @param {string} name
     */
    constructor(name: string) {
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
    public validate(variable: any, name: string) {
        // @ts-ignore
        if (this.passes(variable)) return true;
        return this.message(name);
    }

    /**
     *  Rules validation passes that returns a boolean depending on the outcome of the expression.
     *
     * @param variable
     * @returns {boolean} true if validation passes else false.
     * @throws {Error} if method is called in child class without overriding it first.
     */
    passes(variable: any) {
        throw new Error('Cannot call abstract method');
    }

    /**
     * Returns a Validation message with a string message.
     *
     * @param {string} name of the passed variable.
     * @return {string} message message as string.
     * @throws {Error} if method is called in child class without overriding it first.
     */
    message(name: string) {
        throw new Error('Cannot call abstract method');
    }

    /**
     * Sets this.name
     * @param {string} name rules name
     */
    public setName(name: string) {
        if (/[\s|]/.test(name)) {
            throw new Error('Invalid naming format, please refrain from using spaces.');
        }
        this.name = name;
    }

    /**
     * Binds a value to the private variable values.
     * This will be used if the Rule needs input variables.
     * For example max length == 10.
     *
     * @param {*} values input values, currently any type. may change in the future.
     */
    public setValues(values: any) {
        this.values = values;
    }

    /**
     * Gets rules name.
     * @returns {string} this rules name.
     */
    public getName() {
        return this.name;
    }
}