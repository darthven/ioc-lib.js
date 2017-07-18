"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class of error that describes situation when metadata validation
 * from configuration files was failed
 */
var MetadataValidationError = (function (_super) {
    __extends(MetadataValidationError, _super);
    function MetadataValidationError(pathToConfigurationFile) {
        var _this = this;
        var message = "Metadata validation was failed in file \"" + pathToConfigurationFile + "\".";
        _this = _super.call(this, message) || this;
        _this.name = 'MetadataValidationError';
        return _this;
    }
    return MetadataValidationError;
}(Error));
exports.default = MetadataValidationError;
