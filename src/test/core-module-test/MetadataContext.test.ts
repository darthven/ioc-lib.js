import MetadataContext from "../../lib/core-module/context/MetadataContext";
import * as assert from 'assert'

describe('MetadataContext', () => {
    const configs = [__dirname + "/config/context.json"];
    const context = new MetadataContext(configs);
    describe('#getComponentEntityInstance(componentId: string)', () => {
        const ADMIN_ID = "adminId";
        const USER_ID = "userId";
        const expectedEntityInstanceUser = {
             _name: "testUser3" 
        };
        const expectedEntityInstanceAdmin = {
            _name: "darthven", 
            _age: 21, 
            _user: expectedEntityInstanceUser
        };
        const realEntityInstanceAdmin = context.getComponentEntityInstance(ADMIN_ID);
        it(`Result of getting component's instance by id '${ADMIN_ID}' should be:\n${JSON.stringify(expectedEntityInstanceAdmin, null, 4)}`, () => {
            assert.deepEqual(expectedEntityInstanceAdmin, realEntityInstanceAdmin);
        });

        const realEntityInstanceUser = context.getComponentEntityInstance(USER_ID);
        it(`Result of getting component's instance by id '${USER_ID}' should be:\n${JSON.stringify(expectedEntityInstanceUser, null, 4)}`, () => {
            assert.deepEqual(realEntityInstanceUser, expectedEntityInstanceUser);
        })
    });
});



