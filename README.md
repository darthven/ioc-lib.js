
<h1> ioc-lib.js: Simple Inversion of Control Container for Node.js-based applications</h1>

<h2>INSTALLATION IS NOT RECOMMENDED UNTIL RELEASE 0.1.5</h2>
<h3>All issues and proposals are welcome.</h3>

ioc-lib.js is an simple example of very simple IoC container written on Typescript that will allow you
to build scalable and flexible applications on Node.js platform.


<h2>Full Documentation</h2>

<h3>Preconditions for Usage</h3>

---

- Ecmascript 6 language level is required
- Your applications should consist of classes according 
to the object-oriented principles

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
<pre>
   {
        "__comment__": "Configuration object is the special object that allow the programming context to start scanning the file for the components",
        "configuration": {
        
            "__comment__components__": "Array of components that will be registrated in the context",    
            "components": [                   
                 {
                    "__comment__components__id__": "The unique identifier of the component",
                    "id": "component_id",
                    
                    "__comment__components__name__": "The name of the component",
                    "name": "component_name",
                    
                    "__comment__components__classPath__": "The path to the class which instance will be registrated in context as the component",
                    "classPath": "component_class_path",
                    
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
                            
                            "__comment__components__properties__value__": "The reference to the another component in context",
                            "reference": "another_component_identifier"
                        }                    
                    ],
                    
                    "__comment__components__lifecycle__": "The special object than defines lifecycle of the component in programming context",
                    "lifecycle": {
                        "__comment__components__lifecycle__initMethod__": "The method specified in the class of the component which calls before the registration of the component in the context",
                        "initMethod": "component_init_method_name",
                        
                        "__comment__components__lifecycle__afterPropertiesWereSetMethod__": "The method specified in the class of the component which calls after setting properties to the component in the context",
                        "afterPropertiesWereSetMethod": "component_after_properties_were_set_method_name",
                        
                        "__comment__components__lifecycle__destroyMethod__": "The method specified in the class of the component which calls before removing the component from the context",
                        "destroyMethod": "component_destroy_method_name",                                            
                    }             
                 }            
            ]        
        }   
   }
</pre>

Example of the configuration file:
<pre>
    {
      "configuration": {
        "components": [
          {
            "id": "admin",
            "name": "Admin",
            "classPath": "../entities/Admin.js",
            "properties": [
              {
                "name": "referenceToUser",
                "reference": "user1"
              },
              {
                "name": "name",
                "value": "John Smith"
              },
              {
                "name": "age",
                "value": 35
              }
            ],
            "lifecycle": {
              "initMethod" : "initAdmin",
              "afterPropertiesWereSetMethod": "setPropertiesForAdmin",
              "destroyMethod": "destroyAdmin"
            }
          },
          {
            "id": "user",
            "name": "User",
            "classPath": "../entities/User.js",
            "properties": [
              {
                "name": "name",
                "value": "Julia Brown"
              }
            ],
            "lifecycle": {
              "initMethod" : "initUser",
              "afterPropertiesWereSetMethod": "setPropertiesForUser",
              "destroyMethod": "destroyUser"
            }
          }
        ]
      }
    }
</pre>

<h3>API Documentation</h3>

There are several main classes which took part in programming context process.

<h4>Property Class</h4>

---

Class that can be represented by simple values like string, numbers, arrays etc and references to another components via unique identifiers.

<h5> List of Methods </h5>

- getName - returns the name of the property in string format

- setName - sets the name of the property in string format

- getValue - returns the value of the property in any format

- setValue - sets the name of the property in any format

- getReference - returns the value of the unique identifier of another component in string format

- setReference - sets the value of the unique identifier of another component in string format

<h4>ComponentLifecycle Class</h4>

---

Class that responds for the lifecycle of the component during the context's activity

<h5> List of Methods </h5>

- getComponentId - returns the value of identifier of the component in string format

- setComponentId - sets the value of identifier of the component in string format

- callInitMethod - calls method before component's initialization

- setInitMethod - sets the method to the component in Function format

- callAfterPropertiesWereSetMethod - calls method after setting of component's properties

- setAfterPropertiesWereSetMethod - sets the method to the component in Function format

- callDestroyMethod - calls method before removing component from the context

- setDestroyMethod - sets the method to the component in Function format


<h4>Context Class</h4>

---

Main class that responds for creating context, scanning and parsing configuration files, retrieving, registering and removing components from context

<h5> List of Methods </h5>

- updateContext - updates context if there were any changes in configuration files

- getComponent - returns the component by the unique identifier in string format

- registerShutdownHook - closes programming context after finishing the main process of the application.


<h3>Live Code Sample of Library's Usage</h3>

---

- Creating programming context

<pre>
    const path = require('path');
    import Context from "ioc-lib.js"
    
    //Getting configuration files with metadata
    const configs = [__dirname + "/config1.json", __dirname + "/config2.json", __dirname + "/config3.json"];
    
    //Creating programming context by the following configurations
    let context = new Context(configs);
</pre>


- Getting the component from the context

<pre>   
     //Getting admin component by unique identifier
     let admin = context.getComponent('admin');
     
     //Call custom admin's method if need
     admin.enterSystem();
</pre>

- Closing context after finishing the main process of the application

<pre>
    //Call this method for safe closing context
    context.registerShutdownHook();
</pre>

- Force-update of the context after changing the configuration file

<pre>
    //Call this method for updating context
    context.updateContext();
</pre>

