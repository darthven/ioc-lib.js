"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Admin = (function () {
    function Admin(name, age, user) {
        this._name = name || null;
        this._age = age || null;
        this._user = user || null;
    }
    Object.defineProperty(Admin.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Admin.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (value) {
            this._age = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Admin.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            this._user = value;
        },
        enumerable: true,
        configurable: true
    });
    Admin.prototype.hello = function () {
        console.log('Hello from Admin');
    };
    Admin.prototype.bye = function () {
        console.log('Bye from Admin');
    };
    Admin.prototype.preInitAdmin = function () {
        console.log("BEFORE Init admin");
    };
    Admin.prototype.postInitAdmin = function () {
        console.log("AFTER Init admin");
    };
    Admin.prototype.beforeSettingPropertiesForAdmin = function () {
        console.log("BEFORE Properties were set admin");
    };
    Admin.prototype.afterSettingPropertiesForAdmin = function () {
        console.log("AFTER Properties were set admin");
    };
    Admin.prototype.preDestroyAdmin = function () {
        console.log("BEFORE Destroy admin");
    };
    Admin.prototype.postDestroyAdmin = function () {
        console.log("AFTER Destroy admin");
    };
    return Admin;
}());
exports.default = Admin;
