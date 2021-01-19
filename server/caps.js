'use strict';
const net = require('net');
const port = process.env.PORT || 3030;
const host = process.env.HOST || 'localhost';

const server = net.createServer();

server.listen(port, () => console.log(`server is running on ${port}`));
let connectionPool = {};
server.on('connection', (socket) => {
  console.log('SERVER GOT A CONNECTION!');
  let id = `Socket-${Math.random()}`;
  connectionPool[id] = socket;
  socket.on('data', (data) => {
    let msg = JSON.parse(data.toString().trim());
    if (msg.event && msg.payload) {
      console.log(msg);
      let payload = JSON.stringify(msg);
      for (let socket in connectionPool) {
        connectionPool[socket].write(payload);
      }
    }
  });
  socket.on('error', (e) => console.log('SOCKET ERROR', e));
  socket.on('end', (e) => delete connectionPool[id]);
});

function EVENT(event, payload) {
  let time = new Date().toUTCString();
  console.log({ event, time, payload });
}

/*const eventsEmmiter = require('./events');

eventsEmmiter.on('pickup', (payload) => EVENT('pickup', payload));
eventsEmmiter.on('in-transit', (payload) => EVENT('in-transit', payload));
eventsEmmiter.on('delivered', (payload) => onDelivered(payload));



function onDelivered(payload) {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
}
*/
