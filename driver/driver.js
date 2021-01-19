'use strict';

const io = require('socket.io-client');
const caps = io.connect(`http://localhost:3030/caps`);

caps.on('pickup', (payload) => {
  setTimeout(() => {
    console.log(`picked up ${payload.orderId}`);
    caps.emit('in-transit', payload);
  }, 1500);

  setTimeout(() => {
    console.log(`delivered up ${payload.orderId}`);
    caps.emit('delivered', payload);
  }, 3000);
});

/*
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
*/
