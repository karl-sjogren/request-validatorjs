import { Rule } from "./Rule";
/**
 * Required rule class checks that a variable is a valid URL address.
 */
export declare class Url extends Rule {
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
