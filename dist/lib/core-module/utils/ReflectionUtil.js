"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReflectionUtil = (function () {
    function ReflectionUtil() {
    }
    ReflectionUtil.getFunctionArgumentsNames = function (func) {
        var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
        return args.split(',').map(function (arg) {
            return arg.replace(/\/\*.*\*\//, '').trim();
        }).filter(function (arg) {
            if (arg) {
                return arg;
            }
            return null;
        });
    };
    return ReflectionUtil;
}());
exports.default = ReflectionUtil;
