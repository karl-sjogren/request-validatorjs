import {Rule} from "./Rule";

/**
 * Required rule class checks that a variable is string.
 */
export class RuleString extends Rule {

    /**
     * @inheritDoc
     */
    constructor() {
        super('string');
        this.errorMessage = 'Is not a string!';
    }

    /**
     * @inheritDoc
     * @return {boolean}
     */
    passes(variable: any) {
        super.passes(variable);
        return typeof variable === 'string';
    }
}