

import {Rule} from "./Rule";

/**
 * Required rule class checks that a variable is a valid username.
 */
export class Username extends Rule {

    /**
     * @inheritDoc
     */
    constructor() {
        super('username');
        this.errorMessage = 'Invalid username!';
    }

    /**
     * @inheritDoc
     * @return {boolean}
     */
    passes(variable: any) {
        super.passes(variable);
        let regex = /^[0-9a-zA-Z_.-]+$/;
        return regex.test(variable);
    }
}
