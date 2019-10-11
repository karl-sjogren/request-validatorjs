import {Rule} from "./Rule";

/**
 * Required rule class checks that a variable is in a payload.
 */
export class Required extends Rule {

    /**
     * @inheritDoc
     */
    constructor() {
        super('required');
    }

    /**
     * @inheritDoc
     * @return {boolean}
     */
    passes(variable: any) {
        return typeof variable !== 'undefined' && variable.length > 0;
    }

    /**
     * @inheritDoc
     */
    message(name: string) {
        return name + ' is required!';
    }
}
