import DecoratorContext from "../../lib/core-module/context/DecoratorContext";
import {AdminConfig, UserConfig }from './config/Configuration'
import User from "../core-module-test/entities/User"
import Admin from "../core-module-test/entities/Admin"
import * as assert from "assert";


describe('DecoratorContext', () => {
    const configs = [UserConfig, AdminConfig];
    const context = new DecoratorContext(configs);
    describe('#getComponentEntityInstance(Class: any)', () => {
        const expectedEntityInstanceUser = {
            _name: "testUser3"
        };
        const expectedEntityInstanceAdmin = {
            _name: "darthven",
            _age: 21,
            _user: expectedEntityInstanceUser
        };
        const realEntityInstanceAdmin = context.getComponentEntityInstance(Admin);
        it(`Result of getting component's instance by class name 'Admin' should be:\n${JSON.stringify(expectedEntityInstanceAdmin, null, 4)}`, () => {
            assert.deepEqual(expectedEntityInstanceAdmin, realEntityInstanceAdmin);
        });

        const realEntityInstanceUser = context.getComponentEntityInstance(User);
        it(`Result of getting component's instance by class name 'User' should be:\n${JSON.stringify(expectedEntityInstanceUser, null, 4)}`, () => {
            assert.deepEqual(realEntityInstanceUser, expectedEntityInstanceUser);
        })
    });
});
