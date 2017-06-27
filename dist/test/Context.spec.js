"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonfile = require("jsonfile");
var mocha_typescript_1 = require("mocha-typescript");
var assert = require("assert");
var _ = require('lodash');
var configs = [__dirname + "/config/context.json"];
var ContextTest = (function () {
    function ContextTest() {
    }
    ContextTest.prototype.getObjectsFromJSON = function () {
        var objects = [];
        configs.forEach(function (config, index) {
            var configFile = jsonfile.readFileSync(config).configuration;
            objects.push({ configName: config, config: configFile });
            console.log('OLD CONFIG', objects[index].config.components);
        });
        var expectedResult = [
            {
                configName: 'C:\\Users\\kokh0716\\WebstormProjects\\ExperimentalLib\\src\\test/config/context.json',
                config: {
                    components: [
                        {
                            id: "admin",
                            name: "Admin",
                            classPath: "../test/components/classes/Admin.js",
                            properties: [
                                {
                                    name: "referenceToUser",
                                    reference: "user1"
                                },
                                {
                                    name: "name",
                                    value: "darthven"
                                },
                                {
                                    name: "age",
                                    value: 21
                                }
                            ],
                            lifecycle: {
                                initMethod: "initAdmin",
                                afterPropertiesWereSetMethod: "setPropertiesForAdmin",
                                destroyMethod: "destroyAdmin"
                            }
                        },
                        {
                            id: "user",
                            name: "User",
                            classPath: "../test/components/classes/User.js",
                            properties: [
                                {
                                    name: "name",
                                    value: "user"
                                }
                            ],
                            lifecycle: {
                                initMethod: "initUser",
                                afterPropertiesWereSetMethod: "setPropertiesForUser",
                                destroyMethod: "destroyUser"
                            }
                        }
                    ]
                }
            }
        ];
        console.log('Expected ', expectedResult[0].config.components);
        assert.equal(_.matches(objects, expectedResult), true, "Expected objects have correct file path and components.");
    };
    return ContextTest;
}());
__decorate([
    mocha_typescript_1.test
], ContextTest.prototype, "getObjectsFromJSON", null);
ContextTest = __decorate([
    mocha_typescript_1.suite
], ContextTest);
