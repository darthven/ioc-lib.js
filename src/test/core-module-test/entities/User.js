"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(name) {
        this._name = name;
    }
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.initUser = function () {
        console.log("BEFORE Init user");
    };
    User.prototype.setPropertiesForUser = function () {
        console.log("AFTER Properties were set user");
    };
    User.prototype.destroyUser = function () {
        console.log("BEFORE Destroy user");
    };
    User.prototype.hello = function () {
        console.log('Hello from User');
    };
    return User;
}());
exports.default = User;