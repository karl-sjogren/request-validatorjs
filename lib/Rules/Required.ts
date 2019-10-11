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
        if (typeof variable === 'undefined') return false;
        if(typeof variable !== 'number') variable = variable.length;
        return variable > 0;
    }

    /**
     * @inheritDoc
     */
    message(name: string) {
        return name + ' is required!';
    }
}