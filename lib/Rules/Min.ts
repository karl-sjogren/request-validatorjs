import {Rule} from "./Rule";

/**
 * min rule class checks that a variable has a minimum length of variable.
 */
export class Min extends Rule {

    /**
     * @inheritDoc
     */
    constructor() {
        super('min');
        this.errorMessage = ':attribute is required to be a minimum length of :param';
    }

    /**
     * @inheritDoc
     * @return {boolean}
     */
    passes(variable: any) {
        super.passes(variable);
        this.values = parseInt(this.values);
        if(typeof variable === 'number') {
            return variable >= this.values;
        }
        return variable.length >= this.values;
    }
}