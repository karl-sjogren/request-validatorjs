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
    }

    /**
     * @inheritDoc
     * @return {boolean}
     */
    passes(variable: any) {
        return typeof variable === 'string';
    }

    /**
     * @inheritDoc
     */
    message(name: string) {
        return name + ' needs to be a string!';
    }
}