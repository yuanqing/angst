'use strict';

var angst = require('..');

var argObj = {
  x: 1,
  y: 2
};

var fn = function(x, y) {
  return x + y;
};
console.log(angst(fn, ['x', 'y'])(argObj)); //=> 3

var gn = function(x, z) {
  if (typeof z === 'undefined') {
    return 'z is undefined';
  }
  return x;
};
console.log(angst(gn, ['x', 'z'])(argObj)); //=> 'z is undefined'
