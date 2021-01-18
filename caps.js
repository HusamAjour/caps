'use strict';


const eventsEmmiter = require('./events');

eventsEmmiter.on('pickup', (payload) => EVENT('pickup', payload));
eventsEmmiter.on('in-transit', (payload) => EVENT('in-transit', payload));
eventsEmmiter.on('delivered', (payload) => onDelivered(payload));

function EVENT(event, payload) {
  let time = new Date().toUTCString();
  console.log({ event, time, payload });
}

function onDelivered(payload) {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
}

