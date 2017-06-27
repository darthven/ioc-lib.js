"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Admin = (function () {
    function Admin(name, age, user) {
        this.name = name;
        this.age = age;
        this.user = user;
    }
    Admin.prototype.hello = function () {
        console.log('Hello from Admin');
    };
    Admin.prototype.bye = function () {
        console.log('Bye from Admin');
    };
    Admin.prototype.initAdmin = function () {
        console.log("Init admin");
    };
    Admin.prototype.setPropertiesForAdmin = function () {
        console.log("Properties were set admin");
    };
    Admin.prototype.destroyAdmin = function () {
        console.log("Destroy admin");
    };
    return Admin;
}());
exports.default = Admin;
