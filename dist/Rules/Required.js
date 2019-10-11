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
        var _this = _super.call(this, 'required') || this;
        _this.errorMessage = ':attribute is required!';
        return _this;
    }
    /**
     * @inheritDoc
     * @return {boolean}
     */
    Required.prototype.passes = function (variable) {
        _super.prototype.passes.call(this, variable);
        if (typeof variable === 'undefined')
            return false;
        if (typeof variable !== 'number')
            variable = variable.length;
        return variable > 0;
    };
    return Required;
}(Rule_1.Rule));
exports.Required = Required;
