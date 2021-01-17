'use strict';

const eventsEmmiter = require('../events');
require('../caps');

jest.spyOn(global.console, 'log');

describe('Driver Module', () => {
  beforeEach(() => {
    console.log = jest.fn();
    console.clear();
  });
  it(`1. It shouldn't show a message on the console when the event is pickup`, () => {
    console.log = jest.fn();
    let payload = {
      storeName: '1-206-flowers',
      orderId: 'a0dff043-85eb-4b87-90a5-78e6b79b095d',
      customerName: 'Tomas Nicolas',
      address: 'Lake Demetrisbury, WV',
    };
    eventsEmmiter.emit('pickup', payload);
    expect(console.log).toHaveBeenCalled();
  });

  it(`2. It shouldn't show a message on the console when the event is transit`, () => {
    let payload = {
      storeName: '1-206-flowers',
      orderId: 'a0dff043-85eb-4b87-90a5-78e6b79b095d',
      customerName: 'Tomas Nicolas',
      address: 'Lake Demetrisbury, WV',
    };
    eventsEmmiter.emit('in-transit', payload);
    expect(console.log).toHaveBeenCalled();
  });

  it(`3. It shouldn't show a message on the console when the event is delivered`, () => {
    let payload = {
      storeName: '1-206-flowers',
      orderId: 'a0dff043-85eb-4b87-90a5-78e6b79b095d',
      customerName: 'Tomas Nicolas',
      address: 'Lake Demetrisbury, WV',
    };
    eventsEmmiter.emit('delivered', payload);
    expect(console.log).toHaveBeenCalled();
  });
});
