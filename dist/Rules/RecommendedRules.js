"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Required_1 = require("./Required");
var Max_1 = require("./Max");
var Min_1 = require("./Min");
var Email_1 = require("./Email");
var Json_1 = require("./Json");
var RuleString_1 = require("./RuleString");
var Username_1 = require("./Username");
var Url_1 = require("./Url");
/**
 * Exports the recommended rules in a bundle to ease import lines.
 */
exports.RecommendedRules = [
    new Required_1.Required(),
    new Max_1.Max(),
    new Min_1.Min(),
    new Email_1.Email(),
    new Json_1.Json(),
    new RuleString_1.RuleString(),
    new Username_1.Username(),
    new Url_1.Url()
];
