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
var index_1 = require("../index");
var Required = /** @class */ (function (_super) {
    __extends(Required, _super);
    function Required() {
        return _super.call(this, 'required') || this;
    }
    /**
     * @inheritDoc
     */
    Required.prototype.statement = function (variable) {
        return typeof variable !== 'undefined';
    };
    /**
     * @inheritDoc
     */
    Required.prototype.error = function (name) {
        return name + ' is required!';
    };
    return Required;
}(index_1.Rule));
exports.Required = Required;
