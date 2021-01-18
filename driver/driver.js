'use strict';

const net = require('net');
const client = new net.Socket();
const faker = require('faker');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3030;

client.connect(port, host, () => {
  console.log('Driver CONNECT MSG');
  client.on('data', (data) => {
    const obj = JSON.parse(data);
    if (obj.event === 'pickup') {
      setTimeout(() => {
        console.log(`DRIVER: picked up ${obj.payload.orderId}`);

        let order = JSON.stringify({
          event: 'in-transit',
          payload: obj.payload,
        });
        client.write(order);
      }, 1000);

      setTimeout(() => {
        let order = JSON.stringify({
          event: 'delivered',
          payload: obj.payload,
        });
        client.write(order);
      }, 3000);
    }
  });
});

/*const generateOrder = () => {
  let order = JSON.stringify({
    event: 'pickup',
    payload: {
      storeName: process.env.STORE_NAME,
      orderId: faker.random.uuid(),
      customerName: faker.name.findName(),
      address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
    },
  });

  client.write(order);
};

setTimeout(generateOrder, 5000);
/*
const eventsEmmiter = require('../server/events');
const faker = require('faker');

let driver = (obj) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${obj.orderId}`);
    eventsEmmiter.emit('in-transit', obj);
  }, 1000);
  setTimeout(() => {
    console.log(`DRIVER: delivered up ${obj.orderId}`);
    eventsEmmiter.emit('delivered', obj);
  },3000);
};

module.exports = driver;
*/
