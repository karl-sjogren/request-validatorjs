import {Rule} from "./Rule";

export class Required extends Rule {
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
