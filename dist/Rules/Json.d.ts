import { Rule } from "./Rule";
/**
 * Required rule class checks that a variable is a valid json.
 */
export declare class Json extends Rule {
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
