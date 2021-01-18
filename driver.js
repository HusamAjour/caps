'use strict';

const eventsEmmiter = require('./events');
const faker = require('faker');

let driver = (obj) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${obj.orderId}`);
    eventsEmmiter.emit('in-transit', obj);
  }, 1000);
  setTimeout(() => {
    console.log(`DRIVER: delivered up ${obj.orderId}`);
    eventsEmmiter.emit('delivered', obj);
  }, 3000);
};

module.exports = driver;
