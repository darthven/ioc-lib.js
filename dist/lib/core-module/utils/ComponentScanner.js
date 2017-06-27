"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentScanner = (function () {
    function ComponentScanner(paths) {
        this.paths = paths;
    }
    ComponentScanner.prototype.setPaths = function (paths) {
        this.paths = paths;
    };
    ComponentScanner.prototype.getPaths = function () {
        return this.paths;
    };
    ComponentScanner.prototype.scanComponents = function () {
        /*TODO Here should be the logic of scanning components
          by paths mentioned in config-files
        */
    };
    return ComponentScanner;
}());
exports.default = ComponentScanner;
