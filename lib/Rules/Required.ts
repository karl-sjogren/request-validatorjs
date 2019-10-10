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
     */
    passes(variable: any) {
        return typeof variable !== 'undefined';
    }

    /**
     * @inheritDoc
     */
    message(name: string) {
        return name + ' is required!';
    }
}
