import {MetadataContext} from "../index";
import Admin from "./components/classes/Admin";

const http = require('http');
const path = require('path');
const configs = [__dirname + "/config/context.json", __dirname + "/config/context1.json", __dirname + "/config/context2.json"];
let context1 = new MetadataContext(configs);
//let context2 = new Context(configs);
context1.registerShutdownHook();
//context2.registerShutdownHook();
let admin = context1.getComponentEntityInstance('adminId');

admin.name = 'Bean name';
console.log('From Context', admin);

let admin2 = new Admin();

admin2.name = 'asdad';

admin2.age = 123;

admin2.bye();

console.log('Simple', admin2)

admin.bye();


