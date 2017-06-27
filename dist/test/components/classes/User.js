"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(name) {
        this.name = name;
    }
    User.prototype.hello = function () {
        console.log('Hello from User');
    };
    User.prototype.initUser = function () {
        console.log("Init user");
    };
    User.prototype.setPropertiesForUser = function () {
        console.log("Properties were set user");
    };
    User.prototype.destroyUser = function () {
        console.log("Destroy user");
    };
    return User;
}());
exports.default = User;
