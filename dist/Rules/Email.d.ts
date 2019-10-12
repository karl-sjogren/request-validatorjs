import { Rule } from "./Rule";
/**
 * Required rule class checks that a variable is a valid Email address.
 */
export declare class Email extends Rule {
    /**
     * @inheritDoc
     */
    constructor();
    /**
     * @inheritDoc
     * @return {boolean}
     */
    passes(variable: any): boolean;
}
