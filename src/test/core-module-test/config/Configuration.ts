import Admin from '../entities/Admin'
import User from '../entities/User'
import {default as Component, Scope} from "../../../lib/core-module/context/Component";
import {component} from "../../../lib/core-module/context/decorators";


export default class Configuration {

    @component({                 
        lifecycle: {}
    })   
    public getAdminComponent(): any {        
        return new Admin("darthven", 21, this.getUserComponent().getEntityInstance());
    }

    @component({
        id: "emptyUser",      
        lifecycle: {}
    })
    public getEmptyUserComponent(): any {
        return new User();
    }

    @component({
        id: "userWithName",      
        lifecycle: {}
    })
    public getUserComponent(): any {
        return new User("testUser3");
    }
}


