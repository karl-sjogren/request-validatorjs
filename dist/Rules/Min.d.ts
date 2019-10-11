import { Rule } from "./Rule";
/**
 * min rule class checks that a variable has a minimum length of variable.
 */
export declare class Min extends Rule {
    /**
     * @inheritDoc
     */
    constructor();
    /**
     * @inheritDoc
     * @return {boolean}
     */
    passes(variable: any): boolean;
    /**
     * @inheritDoc
     */
    message(name: string): string;
}
