import {Rule} from "./Rule";

/**
 * Required rule class checks that a variable is a valid Email address.
 */
export class Email extends Rule {

    /**
     * @inheritDoc
     */
    constructor() {
        super('email');
        this.errorMessage = 'Invalid email address!';
    }

    /**
     * @inheritDoc
     * @return {boolean}
     */
    passes(variable: any) {
        let regex = /[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/;
        return regex.test(variable);
    }
}
