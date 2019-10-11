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
        this.errorMessage = ':attribute is required!';
    }

    /**
     * @inheritDoc
     * @return {boolean}
     */
    passes(variable: any) {
        super.passes(variable);
        if (typeof variable === 'undefined') return false;
        if(typeof variable !== 'number') variable = variable.length;
        return variable > 0;
    }
}