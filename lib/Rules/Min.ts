import {Rule} from "./Rule";

/**
 * min rule class checks that a variable has a minimum length of variable.
 */
export class Min extends Rule {

    /**
     * @inheritDoc
     */
    constructor() {
        super('max');
    }

    /**
     * @inheritDoc
     * @return {boolean}
     */
    passes(variable: any) {
        this.values = parseInt(this.values);
        if(typeof variable === 'number') {
            return variable >= this.values;
        }
        return variable.length >= this.values;
    }

    /**
     * @inheritDoc
     */
    message(name: string) {
        return name + ' has a minimum allowed length of ' + this.values;
    }
}
