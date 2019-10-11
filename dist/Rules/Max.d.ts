import { Rule } from "./Rule";
/**
 * Max rule class checks that a variable has a maximum length of variable.
 */
export declare class Max extends Rule {
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
