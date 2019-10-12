import { Rule } from "./Rule";
/**
 * Required rule class checks that a variable is a valid username.
 */
export declare class Username extends Rule {
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
