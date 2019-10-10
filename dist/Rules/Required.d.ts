import { Rule } from "./Rule";
/**
 * Required rule class checks that a variable is in a payload.
 */
export declare class Required extends Rule {
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
