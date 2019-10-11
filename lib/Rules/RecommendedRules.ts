import {Required} from "./Required";
import {Max} from "./Max";
import {Min} from "./Min";
import {Email} from "./Email";
import {Json} from "./Json";
import {RuleString} from "./String";

/**
 * Exports the recommended rules in a bundle to ease import lines.
 */
export var RecommendedRules = [
    new Required(),
    new Max(),
    new Min(),
    new Email(),
    new Json(),
    new RuleString(),
];