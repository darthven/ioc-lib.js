import InternetOrderManagementService from "./components/services/InternetOrderManagementService"
import TvOrderManagementService from "./components/services/TvOrderManagementService"
import MobileOrderManagementService from "./components/services/MobileOrderManagementService"
import Customer from "./components/entities/Customer"
import User from "./components/classes/User"
import Context from "./lib/Context"
// let iservice = new InternetOrderManagementService();
// let tvservice = new TvOrderManagementService();
// let mservice = new MobileOrderManagementService();
// let customer = new Customer('darthven', null);
// let order1 = iservice.createOrder(customer, 'Order1', 2500, 54);
// let order2 = iservice.createOrder(customer, 'Order2', 2500, 54);
// let order3 = tvservice.createOrder(customer, 'Order3', 2500, ['ch1', 'ch2']);
// let order4 = tvservice.createOrder(customer, 'Order4', 2500, ['ch3', 'ch4']);
// let order5 = mservice.createOrder(customer, 'Order5', 2500, ['vodafone', 'life']);
// let order6 = mservice.createOrder(customer, 'Order6', 2500, ['kyivstar', 'beeline']);
// console.log(order5);
const configs = ["../context.json", "../context1.json", "../context2.json"];
let context1 = new Context(configs);
context1.registerShutdownHook();

// let context2 = new Context(["../context2.json"]);
// context2.registerShutdownHook();

let user1 = context1.getComponent('addmin');
console.log(user1);
user1.hello();

// let user2 = context2.getComponent('admin');
// console.log(user2);
// user2.hello();
