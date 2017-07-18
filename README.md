
<h1> ioc-lib.js: Simple Inversion of Control Container for Node.js-based applications</h1>

<h3>All issues and proposals are welcome.</h3>

ioc-lib.js is an simple example of very simple IoC container written on Typescript that will allow you
to build scalable and flexible applications on Node.js platform.


<h2>Full Documentation</h2>

<h3>Main Information</h3>

---

The main purpose of this library is to provide context space for
creating objects and providing management of their lifecycle. The data sources are 
represented by metadata from special configuration files in JSON-format. 

<h3>Metadata Specification</h3>

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
<h3>API Documentation</h3>

<h4>Context Class</h4>

---

Main class that responds for creating context, retrieving and removing components from it

<h5> List of Methods </h5>

- getComponentEntityInstance - returns the component's entity instance by the unique identifier in string format

- registerShutdownHook - closes programming context after finishing the main process of the application.


<h4>MetadataContext Class</h4>

---


Class that is inherited from Context class and responds for scanning and parsing configuration files
and component's registration in the context

<h5> List of Methods </h5>

- updateContext - updates context if there were any changes in configuration files


<h4>DecoratorContext Class</h4>

---

Class that is inherited from Context class and responds for component's registration in the context by decorating classes and methods.
<h5> List of Methods </h5>
IN DEVELOPMENT UNTIL RELEASE 0.2.5

<h3>Live Code Sample of Library's Usage</h3>

---

<h4>Metadata Context Usage Example</h4>

- Create plain classes. They are written on Typescript here, but ES6-classes are very similar, exclude only access modifiers, types usage and constructor reloading.
Anyway, you will understand the main concepts.

Project structure
    
        Typescript-based (used)            Plain JS (ES6+)                
                      ApplicationDirectory
         -- build                        -- configs
            -- configs                       context.json
                context.json             -- src
            [Compilation output]            -- entities
         -- src                                 User.js
            -- entities                     -- services
                User.ts                         Service.js
            -- services                      index.js
                Service.ts
             index.ts   
                     

Service.ts
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

User.ts
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

index.ts
- Create programming context based on metadata

```typescript   
    import {MetadataContext} from 'ioc-lib.js/dist'
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

