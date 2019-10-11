import {Rule} from "./Rule";

/**
 * Required rule class checks that a variable is a valid json.
 */
export class Json extends Rule {

    /**
     * @inheritDoc
     */
    constructor() {
        super('json');
        this.errorMessage = 'Invalid json!';
    }

    /**
     * @inheritDoc
     * @return {boolean}
     */
    passes(variable: any) {
        try {
            JSON.parse(variable);
        } catch (e) {
            return false;
        }
        return true;
    }
}