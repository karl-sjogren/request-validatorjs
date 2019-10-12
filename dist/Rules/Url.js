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
 * Required rule class checks that a variable is a valid URL address.
 */
var Url = /** @class */ (function (_super) {
    __extends(Url, _super);
    /**
     * @inheritDoc
     */
    function Url() {
        var _this = _super.call(this, 'url') || this;
        _this.errorMessage = 'Invalid email address!';
        return _this;
    }
    /**
     * @inheritDoc
     * @return {boolean}
     */
    Url.prototype.passes = function (variable) {
        try {
            new URL(variable);
            return true;
        }
        catch (_) {
            return false;
        }
    };
    return Url;
}(Rule_1.Rule));
exports.Url = Url;
