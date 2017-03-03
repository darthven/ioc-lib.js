import InternetOrderManagementService from "./components/services/internet/InternetOrderManagementService"
import TvOrderManagementService from "./components/services/tv/TvOrderManagementService"
import Customer from "./components/entities/Customer"


let iservice = new InternetOrderManagementService();
let tvservice = new TvOrderManagementService();
let customer = new Customer('darthven', null);



let order1 = iservice.createOrder(customer, 'Order1', 2500, 54);
let order2 = iservice.createOrder(customer, 'Order2', 2500, 54);
let order3 = tvservice.createOrder(customer, 'Order3', 2500, ['ch1', 'ch2']);
let order4 = tvservice.createOrder(customer, 'Order4', 2500, ['ch3', 'ch4']);

console.log(order3);
