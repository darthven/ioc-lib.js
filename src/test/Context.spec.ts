/**
 * Created by kokh0716 on 6/5/2017.
 */
import Context from "../lib/core-module/context/Context"
import {Scope, default as Component} from '../lib/core-module/context/Component'
import Property from '../lib/core-module/context/Property'
import ComponentLifeCycle from '../lib/core-module/context/ComponentLifecycle'
import ComponentNotFoundError from '../lib/core-module/errors/ComponentNotFoundError'
import jsonfile = require('jsonfile');
import { suite, test, slow, timeout } from "mocha-typescript";
import * as assert from "assert";
const _ = require('lodash');
const configs = [__dirname + "/config/context.json"];
@suite class ContextTest {
    @test getObjectsFromJSON() {
        let objects = [];
        configs.forEach((config, index) => {
            let configFile = jsonfile.readFileSync(config).configuration;
            objects.push({configName: config, config: configFile});
            console.log('OLD CONFIG', objects[index].config.components);
        });

        const expectedResult = [
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
                            lifecycle : {
                                initMethod : "initAdmin",
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
                                initMethod : "initUser",
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
    }
}