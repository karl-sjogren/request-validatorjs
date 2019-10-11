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
    }

    /**
     * @inheritDoc
     * @return {boolean}
     */
    passes(variable: any) {
        let regex = /[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/;
        return regex.test(variable);
    }

    /**
     * @inheritDoc
     */
    message(name: string) {
        return name + ' is not a valid email!';
    }
}
