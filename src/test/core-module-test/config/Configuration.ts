import Admin from '../entities/Admin'
import User from '../entities/User'
import {component} from "../../../lib/core-module/context/decorators";


export default class Configuration {

    @component({                 
        lifecycle: {}
    })   
    public getAdminComponent(): Admin {
        return new Admin("darthven", 21, this.getUserComponent());
    }

    @component({
        id: "emptyUser",      
        lifecycle: {}
    })
    public getEmptyUserComponent(): User {
        return new User();
    }

    @component({
        id: "userWithName",      
        lifecycle: {}
    })
    public getUserComponent(): User {
        return new User("testUser3");
    }
}


