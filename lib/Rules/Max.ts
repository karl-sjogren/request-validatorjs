import {Rule} from "./Rule";

/**
 * Max rule class checks that a variable has a maximum length of variable.
 */
export class Max extends Rule {

    /**
     * @inheritDoc
     */
    constructor() {
        super('max');
        this.errorMessage = ':attribute is required to be a maximum length of :param';
    }

    /**
     * @inheritDoc
     * @return {boolean}
     */
    passes(variable: any) {
        super.passes(variable);
        this.values = parseInt(this.values);
        if(typeof variable === 'number') {
            return variable <= this.values;
        }
        return variable.length <= this.values;
    }
}