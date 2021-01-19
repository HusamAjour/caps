'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3030;
const faker = require('faker');
const caps = io.connect(`http://localhost:3030/caps`);
const STORE_NAME = `1-206-flowers`;
let channel = STORE_NAME;
console.log(channel);
caps.emit('join', channel);

caps.on('joined', (joinedChannel) => {
  console.log(`Joined Room: ${joinedChannel}`);
  channel = joinedChannel;
});


caps.on('delivered', (payload) => {
  console.log(`Thank you for delivering ${payload.orderId}`);
});


const generateOrder = () => {
  let payload = {
      storeName: STORE_NAME,
      orderId: faker.random.uuid(),
      customerName: faker.name.findName(),
      address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };
  caps.emit('pickup' ,payload);
};

setInterval(generateOrder, 5000);


/*const net = require('net');
const faker = require('faker');
const client = new net.Socket();



client.connect(port, host, () => {
  console.log('Vendor CONNECT MSG');
  client.on('data', (data) => {
    const obj = JSON.parse(data);
    console.log(`Inside Vendor: `);
    console.log(obj);
    if (obj.event === 'delivered') {
      console.log(`thank you for delivering ${obj.payload.orderId}`);
    }
  });
});

const generateOrder = () => {
  let orderObj = {
    event: 'pickup',
    payload: {
      storeName: process.env.STORE_NAME,
      orderId: faker.random.uuid(),
      customerName: faker.name.findName(),
      address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
    },
  };
  let order = JSON.stringify(orderObj);
  console.log(order);
  client.write(order);
};

setInterval(generateOrder, 5000);

*/
/*const eventsEmmiter = require('./events');
require('dotenv').config();
const faker = require('faker');
require('./caps');
const store = process.env.STORE_NAME;

const generateOrder = () => {
  let orderObj = {
    storeName: process.env.STORE_NAME,
    orderId: faker.random.uuid(),
    customerName: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };
  eventsEmmiter.emit('pickup', orderObj);
  return orderObj;
};
module.exports = generateOrder;

*/
