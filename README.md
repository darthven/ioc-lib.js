
<h1> ioc-lib.js: Simple Inversion of Control Container for Node.js-based applications</h1>

<h3>All issues and proposals are welcome.</h3>

ioc-lib.js is an simple example of very simple IoC container written on Typescript that will allow you
to build scalable and flexible applications on Node.js platform.


<h2>Full Documentation</h2>

<h3>Main Information</h3>

---

The main purpose of this library is to provide context space for
creating objects with some logic (called components here) and providing lifecycle's management for them. 
The data sources can be represented by metadata from special configuration files in JSON-format or
by creating special configuration classes/modules that will register them in this context via decorators. 

<h3>Metadata-based Configuration Specification</h3>

---
If you want to specify special objects as the components of your system and registry them
in the programming context of the library you will need to create configuration file by the
following specification:
```json
{
    "__comment__": "Configuration object is the special object
    that allow the programming context to start scanning the file for the components",
    "configuration": {
    
        "__comment__components__": "Array of components that will be registrated in the context",    
        "components": [                   
             {
                "__comment__components__id__": "The unique identifier of the component",
                "id": "component_id",
                
                "__comment__components__name__": "The name of the component",
                "name": "component_name",
                
                "__comment__components__classPath__": "The path to the class which instance
                will be registrated in context as the component",
                "classPath": "component_class_path",
                
                "__comment__components__scope__": "Enumeration of two possible component's scopes.
                It can be represented as two types of values:
                 1) SINGLETON (component based on this object will be created once in the application context)
                 2) PROTOTYPE (component can be created several times as the copies of the one main instance)",
                "scope": "component_scope",
                
                "__comment__components__properties__": "The array of properties of the component",                    
                "properties" : [                    
                    {
                        "__comment__components__properties__name__": "The name of the property",
                        "name": "property_name",
                        
                        "__comment__components__properties__value__": "The value of the property",
                        "value": "property_value"
                    },
                    
                    {
                        "__comment__components__properties__name__": "The name of the property",
                        "name": "property_name",
                        
                        "__comment__components__properties__value__": "The reference to the another
                        component in context",
                        "reference": "another_component_identifier"
                    }                    
                ],
                
                "__comment__components__lifecycle__": "The special object than defines
                lifecycle of the component in programming context",
                "lifecycle": {
                    "__comment__components__lifecycle__preInitMethod__": "The method specified in the class
                    of the component which calls before the registration of the component in the context",
                    "preInitMethod": "component_init_method_name",
                    
                    "__comment__components__lifecycle__postInitMethod__": "The method specified in the class
                    of the component which calls after the registration of the component in the context",
                    "postInitMethod": "component_init_method_name",          
                    
                    "__comment__components__lifecycle__beforePropertiesWillBeSetMethod__": "The method specified
                    in the class of the component which calls before setting properties to the component
                    in the context",
                    "beforePropertiesWillBeSetMethod": "component_before_properties_will_be_set_method_name",
                    
                    "__comment__components__lifecycle__afterPropertiesWereSetMethod__": "The method specified
                    in the class of the component which calls after setting properties to the component
                    in the context",
                    "afterPropertiesWillBeSetMethod": "component_after_properties_were_set_method_name",            
                    
                    "__comment__components__lifecycle__preDestroyMethod__": "The method specified in the class
                    of the component which calls before removing the component from the context",
                    "preDestroyMethod": "component_pre_destroy_method_name",
                    
                    "__comment__components__lifecycle__postDestroyMethod__": "The method specified in the class
                    of the component which calls after removing the component from the context",
                    "postDestroyMethod": "component_post_destroy_method_name"                                           
                }             
             }            
        ]        
    }   
}
```

Example of the configuration file:
```json 
{
    "configuration": {
        "components" : [
                {
                      "id": "adminId",
                      "name": "Admin",
                      "classPath": "dist/test/components/classes/Admin.js",
                      "scope": "prototype",
                      "properties": [
                            {
                              "name": "user",
                              "reference": "userId"
                            },
                            {
                                "name": "name",
                                "value": "darthven"
                            },
                            {
                                "name": "age",
                                "value": 21
                            }
                      ],
                      "lifecycle" : {
                          "preInitMethod" : "preInitAdmin",
                          "postInitMethod": "postInitAdmin",
                          "beforePropertiesWillBeSetMethod": "beforeSettingPropertiesForAdmin",
                          "afterPropertiesWereSetMethod": "afterSettingPropertiesForAdmin",
                          "preDestroyMethod": "preDestroyAdmin",
                          "postDestroyMethod": "postDestroyAdmin"
                      }
              },
              {
                  "id": "userId",
                  "name": "User",
                  "classPath": "dist/test/components/classes/User.js",
                  "scope": "singleton",
                  "properties": [
                        {
                          "name": "name",
                          "value": "testUser3"
                        }
                  ]
              }
        ]
    }
}   
```

<h3>Decorator-based Configuration Specification</h3>

---
If you want to specify special objects as the components of your system and registry them
in the programming context of the library you will need to create special configuration class/module:
```typescript
class CustomConfiguration {
    
    @component({})
    public getComponentAlpha(): Alpha {
        return new Alpha(...args)
    }
    
    @component({
       id: "empty-beta",
       scope: Scope.PROTOTYPE
    })
    public getComponentBeta(): Beta {
        return new Beta();   
    }
    
    @component({
        id: "beta",
        scope: Scope.SINGLETON
    })
    public getComponentBeta(): Beta {
        return new Beta(...args);    
    }
}
```
As you can see, there are different usages of the component decorator. Some of them
has unique identifier parameter that will allow you to retrieve them from the context by
the "id" you have defined.
 
Also, you can specify the scope of the component, its name 
and path to the class it is based on, but notice that "name" and "classPath" parameters are not
necessary as they will not affect the application context.
 
If there are no paremeters defined, you can retrieve components by its class/module name from 
the context (see API documentation below), but be sure that there is only one type of this component
can exist in the context. 

If you have several definitions of the same type (see Beta component), you must set the unique id-parameter 
and retrieve these components directly via this identifier. 

If you need to inject one component to another:
```typescript
class CustomConfiguration {
    
    @component({})
    public getComponentAlpha(): Alpha {
        //If Alpa's constructor has first argument's type of Beta
        return new Alpha(this.getComponentBeta(), ...args);
    }  
    
    @component({
        id: "beta",
        scope: Scope.SINGLETON
    })
    public getComponentBeta(): Beta {
        return new Beta(...args);  
    }
}
```
If you want to provide lifecycle management for the component:
```typescript
class Alpha {
     
    @preInit
    public preInitAlpha() {
        //Some custom logic
    }
    
    @postInit
    public postInitAlpha() {
        //Some custom logic
    }
   
    @preDestroy
    public preDestroyAlpha() {
        //Some custom logic
    }
    
    @postDestroy
    public postDestroyAlpha() {
        //Some custom logic
    }     
}
```
These decorators will register marked functions as the component's lifecycle methods,
which means function marked as @preInit will be called before the component will be 
registered in the application context. The same rules are working for @postInit, @preDestroy and
@postDestroy decorators (more information you can find in the API documentation below)

<h3>API Documentation</h3>

<h4>Context Class</h4>

---

Main class that responds for creating context, retrieving and removing components from it

<h5> List of Methods </h5>

- getComponentEntityInstanceById - returns the component's entity instance by the unique identifier

- registerShutdownHook - closes programming context after finishing the main process of the application.

- updateContext - updates context if there were any changes in configuration files

<h4>MetadataContext Class</h4>

---

Class that is inherited from Context class and responds for scanning and parsing configuration files
and component's registration in the context

All available methods are implemented from the Context class.

<h4>DecoratorContext Class</h4>

---

Class that is inherited from Context class and responds for component's registration in the context by decorating classes and methods.
<h5> List of Methods </h5>
- getComponentEntityInstanceByClass - returns the component's entity instance by its class/module's type

<h3>Live Code Sample of Library's Usage</h3>

---

<h4>Metadata Context Usage Example</h4>

- Create class of Service entity
```typescript
class Service {

    private _name: string;

    private _price: number;

    constructor();

    constructor(name: string, price: number);

    constructor(name?: string, price?: number) {
        this._name = name || null;
        this._price = price || 0;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    public preInitService() : void {
        console.log('BEFORE Service will be initialized');
    }

    public afterPropertiesWereSetToService() : void {
        console.log('AFTER Service received its props');
    }

    public preDestroyService() : void {
        console.log('BEFORE Service will bee destroyed');
    }
}

export default Service;
```

- Create class of User entity
```typescript
import Service from "../services/Service";

class User {

    private _name: string;

    private _age: number;

    private _phoneNumbers: string[];

    private _service: Service;

    constructor();

    constructor(name: string, age: number, phoneNumbers: string[], service: Service);

    constructor(name?: string, age?: number, phoneNumbers?: string[], service?: Service) {
        this._name = name || null;
        this._age = age || 0;
        this._phoneNumbers = phoneNumbers || [];
        this._service = service || null;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    get phoneNumbers(): string[] {
        return this._phoneNumbers;
    }

    set phoneNumbers(value: string[]) {
        this._phoneNumbers = value;
    }

    get service(): Service {
        return this._service;
    }

    set service(value: Service) {
        this._service = value;
    }

    public preInitUser(): void {
        console.log('BEFORE User will be initialized');
    }

    public postInitUser(): void {
        console.log('AFTER User will be initialized');
    }

    public beforePropertiesWereSetToUser(): void {
        console.log('BEFORE User received its props');
    }

    public afterPropertiesWereSetToUser(): void {
        console.log('AFTER User received its props');
    }

    public preDestroyUser(): void {
        console.log('BEFORE User will be destroyed');
    }

    public postDestroyUser(): void {
        console.log('AFTER User will be destroyed');
    }
}

export default User;
```

- Create configuration file by the library's specification

```json
{
  "configuration": {
    "components": [
      {
        "id": "user",
        "name": "USER",
        "classPath": "build/entities/User.js",
        "scope": "singleton",
        "properties": [
          {
            "name": "name",
            "value": "John Smith"
          },
          {
            "name": "age",
            "value": 23
          },
          {
            "name": "phoneNumbers",
            "value": [
              "12312312",
              "41241412",
              "45788943"
            ]
          },
          {
            "name": "service",
            "reference": "service"
          }
        ],
        "lifecycle": {
          "preInitMethod" : "preInitUser",
          "postInitMethod": "postInitUser",
          "beforePropertiesWillBeSetMethod": "beforePropertiesWereSetToUser",
          "afterPropertiesWereSetMethod": "afterPropertiesWereSetToUser",
          "preDestroyMethod": "preDestroyUser",
          "postDestroyMethod": "postDestroyUser"
        }
      },

      {
        "id": "service",
        "name": "SERVICE",
        "classPath": "build/services/Service.js",
        "scope": "prototype",
        "properties": [
          {
            "name": "name",
            "value": "Test Mobile Service"
          },
          {
            "name": "price",
            "value": 12345.53
          }
        ],
        "lifecycle": {
          "preInitMethod": "preInitService",
          "afterPropertiesWereSetMethod": "afterPropertiesWereSetToService",
          "preDestroyMethod": "preDestroyService"
        }
      }
    ]
  }
}
```

- Create programming context based on metadata

```typescript   
    import {MetadataContext} from 'ioc-lib.js'
    const path = require('path');
    
    //Getting configuration files with metadata (can be several files)
    const configs = [__dirname + "configs/config.json"];
    
    //Creating programming context by the following configurations
    let context = new MetadataContext(configs);
```


- Get the component from the context

```typescript   
    //Getting admin component's entity instance by unique identifier
    let admin = context.getComponentEntityInstance('admin');
     
    //Call custom admin's method if need
    console.log(admin.getName());
```

- Close context after finishing the main process of the application

```typescript
    //Call this method for safe closing context
    context.registerShutdownHook();
```

- Force-update the context after changing the configuration file

```typescript
    //Call this method for updating context
    context.updateContext();
```
---

<h4>Decorator Context Usage Example</h4>

- Create class of User entity

```typescript
import {preInit, preDestroy} from "ioc-lib.js"

class User {

    private _name: string;

    constructor(name?: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    @preInit
    public initUser(): void {
        console.log("BEFORE Init user");
    };

    @preDestroy
    public destroyUser(): void {
        console.log("BEFORE Destroy user");
    };

    public hello(): void {
        console.log('Hello from User');
    };
}

export default User;
```

- Create class of Admin entity
```typescript
import User from './User'
import {preInit, postInit, preDestroy, postDestroy} from "ioc-lib.js"

class Admin {

    private _name: string;

    private _age: number;

    private _user: User;

    constructor(name: string, age: number, user?: User) {
        this._name = name;
        this._age = age;
        this._user = user;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    public hello(): void {
        console.log('Hello from Admin');
    };
    public bye(): void {
        console.log('Bye from Admin');
    };

    @preInit
    public preInitAdmin(): void {
        console.log("BEFORE Init admin");
    };

    @postInit
    public postInitAdmin(): void {
        console.log("AFTER Init admin");
    };

    @preDestroy
    public preDestroyAdmin(): void {
        console.log("BEFORE Destroy admin");
    };

    @postDestroy
    public postDestroyAdmin(): void {
        console.log("AFTER Destroy admin");
    };
}

export default Admin;
```

- Create Configuration class for configuring components
```typescript
import Admin from '../entities/Admin'
import User from '../entities/User'
import {component} from "ioc-lib.js";

class Configuration {

    @component({})
    public getAdminComponent(): Admin {
        return new Admin("darthven", 21, this.getUserComponent());
    }

    @component({
        id: "emptyUser"
    })
    public getEmptyUserComponent(): User {
        return new User();
    }

    @component({
        id: "userWithName"
    })
    public getUserComponent(): User {
        return new User("testUser3");
    }
}

export default Configuration;
```

- Create programming context based on decorators and retrieve components from it
```typescript
import {DecoratorContext} from 'ioc-lib.js'
import Configuration from "./config/Configuration"
import Admin from "./entities/Admin";

//Passing configuration classes here
const configs = [Configuration];

//Creating decorator's context based on this configuration
let decoratorCtx = new DecoratorContext([Configuration]);

//Providing safe close for the application context
decoratorCtx.registerShutdownHook();

//Retrieving admin component instance from the context by the class name
const admin = decoratorCtx.getComponentEntityInstanceByClass(Admin);
console.log(`Admin from decorator's context:\n${JSON.stringify(admin, null, 4)}`);

//Retrieving user component instance from the context by the unique identifier
const user = decoratorCtx.getComponentEntityInstanceById('userWithName');
console.log(`User from decorator's context:\n${JSON.stringify(user, null, 4)}`);
```
