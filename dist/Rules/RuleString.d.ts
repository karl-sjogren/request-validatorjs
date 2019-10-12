import { Rule } from "./Rule";
/**
 * Required rule class checks that a variable is string.
 */
export declare class RuleString extends Rule {
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
