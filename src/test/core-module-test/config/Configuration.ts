import Admin from '../entities/Admin'
import User from '../entities/User'
import {Scope} from "../../../lib/core-module/context/Component";
import {component} from "../../../lib/core-module/context/decorators";

export class AdminConfig {

    constructor() {
    }

    @component({
        name: "admin",
        classPath: "src/test/core-module-test/entities/Admin",
        scope: Scope.SINGLETON,
        lifecycle: {}
    })
    public getAdminComponent(): Admin {
        return new Admin("darthven", 21, new User('testUser3'));
    }
}

export class UserConfig {

    constructor() {
    }

    @component({
        name: "user",
        classPath: "src/test/core-module-test/entities/User",
        scope: Scope.PROTOTYPE,
        lifecycle: {}
    })
    public getUserComponent(): User {
        return new User("testUser3");
    }
}

