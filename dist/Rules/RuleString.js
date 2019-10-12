"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Rule_1 = require("./Rule");
/**
 * Required rule class checks that a variable is string.
 */
var RuleString = /** @class */ (function (_super) {
    __extends(RuleString, _super);
    /**
     * @inheritDoc
     */
    function RuleString() {
        var _this = _super.call(this, 'string') || this;
        _this.errorMessage = 'Is not a string!';
        return _this;
    }
    /**
     * @inheritDoc
     * @return {boolean}
     */
    RuleString.prototype.passes = function (variable) {
        _super.prototype.passes.call(this, variable);
        return typeof variable === 'string';
    };
    return RuleString;
}(Rule_1.Rule));
exports.RuleString = RuleString;
