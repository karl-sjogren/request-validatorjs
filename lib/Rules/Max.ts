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
    }

    /**
     * @inheritDoc
     * @return {boolean}
     */
    passes(variable: any) {
        this.values = parseInt(this.values);
        if(typeof variable === 'number') {
            return variable <= this.values;
        }
        return variable.length <= this.values;
    }

    /**
     * @inheritDoc
     */
    message(name: string) {
        return name + ' requires a maximum length of ' + this.values;
    }
}
