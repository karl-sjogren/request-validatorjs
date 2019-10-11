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
 * min rule class checks that a variable has a minimum length of variable.
 */
var Min = /** @class */ (function (_super) {
    __extends(Min, _super);
    /**
     * @inheritDoc
     */
    function Min() {
        var _this = _super.call(this, 'min') || this;
        _this.errorMessage = ':attribute is required to be a minimum length of :param';
        return _this;
    }
    /**
     * @inheritDoc
     * @return {boolean}
     */
    Min.prototype.passes = function (variable) {
        _super.prototype.passes.call(this, variable);
        this.values = parseInt(this.values);
        if (typeof variable === 'number') {
            return variable >= this.values;
        }
        return variable.length >= this.values;
    };
    return Min;
}(Rule_1.Rule));
exports.Min = Min;
