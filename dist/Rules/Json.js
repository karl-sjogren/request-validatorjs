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
 * Required rule class checks that a variable is a valid json.
 */
var Json = /** @class */ (function (_super) {
    __extends(Json, _super);
    /**
     * @inheritDoc
     */
    function Json() {
        var _this = _super.call(this, 'json') || this;
        _this.errorMessage = 'Invalid json!';
        return _this;
    }
    /**
     * @inheritDoc
     * @return {boolean}
     */
    Json.prototype.passes = function (variable) {
        try {
            JSON.parse(variable);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    return Json;
}(Rule_1.Rule));
exports.Json = Json;
