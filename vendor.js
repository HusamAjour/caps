'use strict';

const eventsEmmiter = require('./events');
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