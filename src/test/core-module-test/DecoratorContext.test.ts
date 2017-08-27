import DecoratorContext from "../../lib/core-module/context/DecoratorContext";
import Configuration from './config/Configuration'
import User from "../core-module-test/entities/User"
import Admin from "../core-module-test/entities/Admin"
import * as assert from "assert";


describe('DecoratorContext', () => {
    const configs = [Configuration];
    const context = new DecoratorContext(configs);
    context.registerShutdownHook();
    describe('#getComponentEntityInstanceByClass(Class: any)', () => {

        const expectedEntityInstanceAdmin: Admin = new Admin("darthven", 21, context.getComponentEntityInstanceById("userWithName"));
        const realEntityInstanceAdmin: Admin = context.getComponentEntityInstanceByClass(Admin);
        it(`Result of getting component's instance by class name 'Admin' should be:\n${JSON.stringify(expectedEntityInstanceAdmin, null, 4)}`, () => {
            assert.deepEqual(expectedEntityInstanceAdmin, realEntityInstanceAdmin);
        });
    });
    describe('#getComponentEntityInstanceById(componentId: string)', () => {
        const expectedEntityInstanceUser: User = new User("testUser3");
        const realEntityInstanceUser: User = context.getComponentEntityInstanceById("userWithName");
        it(`Result of getting component's instance by class name 'User' should be:\n${JSON.stringify(expectedEntityInstanceUser, null, 4)}`, () => {
            assert.deepEqual(realEntityInstanceUser, expectedEntityInstanceUser);
        })
    });
});
