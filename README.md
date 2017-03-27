# ExperimentalLib
Lib on Typescript that imitates Spring Core

This library's puprose is to provide context space for
creating objects and providing management of their lifecycle.
Took inspiration from Spring Core.

Main concepts (for server-side apps):

1) Our application has classes. They can be at least of two types (like in this example):
  a) classes-entities, that describe main information and properties
  b) classes-services, that descibe how classes-entities can be managed (business-logic)

In this test-project we have two main types of entities - Customer and Order.

As it can be expected, customer needs to make an order, but as there are several kinds of
orders, I provided inheritance between Order class and other child-classes.

After defining enitities, I need some services with all business-logic I could use as a customer or
the system could use from the server-side. There are only one abstract service and three child-services
with their concrete implementetion according to their types.
In current example I have not used real database so almost all functions in services are stub-functions so just imagine
how it should work if system had real datasource)

2) Now, when we got the two main things for building this small app - entities and services - we can keep on moving to the most
interesting part of this project.
There is lib directory where I have created four classes: Property, Component, Context and Lifecycle.
  a) Context class is a prototype of sandbox where all objects defined in configuration (context.json) will be created.
  b) Component class is a special mark of classes which object instances will be created in context.
  c) Property class is the property of component than can store  simple values like string, numbers etc or references to another components
  d) Lifecycle class is responsible for management of component's lifecycle, it can be represented as initilazing method that is called
  before object's creation in context; method, that is called after setting properties to the component; method, that is called after destroying
  component in context.
At the moment, this library has only stub-functions but it will be improved in future according to the main principles of inversion of control
and Spring Core's container.












So, how can it be used?
