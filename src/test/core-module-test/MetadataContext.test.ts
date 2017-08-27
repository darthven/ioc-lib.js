import MetadataContext from "../../lib/core-module/context/MetadataContext";
import User from "../core-module-test/entities/User"
import Admin from "../core-module-test/entities/Admin"
import * as assert from 'assert'

describe('MetadataContext', () => {
    const configs = [__dirname + "/config/context.json"];
    const context = new MetadataContext(configs);
    context.registerShutdownHook();
    describe('#getComponentEntityInstance(componentId: string)', () => {
        const ADMIN_ID: string = "adminId";
        const USER_ID: string = "userId";
        const expectedEntityInstanceUser: User = new User("testUser3");
        const expectedEntityInstanceAdmin: Admin = new Admin("darthven", 21, expectedEntityInstanceUser);
        const realEntityInstanceAdmin: Admin = context.getComponentEntityInstanceById(ADMIN_ID);
        it(`Result of getting component's instance by id '${ADMIN_ID}' should be:\n${JSON.stringify(expectedEntityInstanceAdmin, null, 4)}`, () => {
            assert.deepEqual(expectedEntityInstanceAdmin, realEntityInstanceAdmin);
        });

        const realEntityInstanceUser: User = context.getComponentEntityInstanceById(USER_ID);
        it(`Result of getting component's instance by id '${USER_ID}' should be:\n${JSON.stringify(expectedEntityInstanceUser, null, 4)}`, () => {
            assert.deepEqual(realEntityInstanceUser, expectedEntityInstanceUser);
        })
    });
});



