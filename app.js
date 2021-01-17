'use strict';

require('./caps');
let vendor = require('./vendor');
let driver = require('./driver');


setInterval( () => {
    let obj = vendor();
    driver(obj);
  }, 5000);
