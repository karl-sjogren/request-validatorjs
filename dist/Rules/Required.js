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
 * Required rule class checks that a variable is in a payload.
 */
var Required = /** @class */ (function (_super) {
    __extends(Required, _super);
    /**
     * @inheritDoc
     */
    function Required() {
        return _super.call(this, 'required') || this;
    }
    /**
     * @inheritDoc
     * @return {boolean}
     */
    Required.prototype.passes = function (variable) {
        return typeof variable !== 'undefined' && variable.length > 0;
    };
    /**
     * @inheritDoc
     */
    Required.prototype.message = function (name) {
        return name + ' is required!';
    };
    return Required;
}(Rule_1.Rule));
exports.Required = Required;
