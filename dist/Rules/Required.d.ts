import { Rule } from "../index";
export declare class Required extends Rule {
    constructor();
    /**
     * @inheritDoc
     */
    statement(variable: any): boolean;
    /**
     * @inheritDoc
     */
    error(name: string): string;
}
