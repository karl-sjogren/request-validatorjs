import {Rule} from "./Rule";

/**
 * Required rule class checks that a variable is a valid Email address.
 */
export class Url extends Rule {

    /**
     * @inheritDoc
     */
    constructor() {
        super('url');
        this.errorMessage = 'Invalid email address!';
    }

    /**
     * @inheritDoc
     * @return {boolean}
     */
    passes(variable: any) {
        try {
            new URL(variable);
            return true;
        } catch (_) {
            return false;
        }
    }
}
