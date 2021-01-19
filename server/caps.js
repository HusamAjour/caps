'use strict';

require('dotenv').config();
let port = process.env.PORT || 3030
const io = require('socket.io')(port);
capsNamespace(io);
io.on('connection', (socket) => {
  console.log('Welcome to Global Connection ! ');
  console.log('Default Namespace');

  socket.on('error', (err) => {
    io.emit('error', err);
  });

  socket.on('action', (payload) => {
    io.emit('action', payload);
  });
});

function capsNamespace (io){
  const caps = io.of('/caps');
  let currentRoom = '';
  caps.on('connection', (socket) => {
    console.log('Caps Namespace');
    socket.on('join', (room) => {
      socket.leave(currentRoom);
      socket.join(room);
      currentRoom = room;

      io.emit('action', `Someone Joined Room : ${room}`);
      caps.to(`${socket.id}`).emit('joined', room);
    });

    socket.on('pickup', (payload) => {
      let obj = {
        event: 'pickup',
        time: new Date().toLocaleTimeString(),
        payload
      }
      console.log('EVENT ', obj);
      caps.emit('pickup', payload);
    });

    socket.on('in-transit', (payload) => {
      let obj = {
        event: 'in-transit',
        time: new Date().toLocaleTimeString(),
        payload
      }
      console.log('EVENT ', obj);
      caps.to(currentRoom).emit('in-transit', payload);
    });

    socket.on('delivered', (payload) => {
      let obj = {
        event: 'delivered',
        time: new Date().toLocaleTimeString(),
        payload
      }
      console.log('EVENT ', obj);
      caps.to(currentRoom).emit('delivered', payload);
    });
  });
};

/*const net = require('net');
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
*/
/*const eventsEmmiter = require('./events');

eventsEmmiter.on('pickup', (payload) => EVENT('pickup', payload));
eventsEmmiter.on('in-transit', (payload) => EVENT('in-transit', payload));
eventsEmmiter.on('delivered', (payload) => onDelivered(payload));



function onDelivered(payload) {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
}
*/
