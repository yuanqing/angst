'use strict';

var angst = require('..');

var argObj = {
  x: 1,
  y: 2
};

var fn = function(x, y) {
  return x + y;
};
console.log(angst(fn)(argObj)); //=> 3
console.log(angst.parse(fn));   //=> ['x', 'y']

var gn = function(x, z) {
  if (typeof z === 'undefined') {
    return 'z is undefined';
  }
  return x;
};
console.log(angst(gn)(argObj)); //=> 'z is undefined'
console.log(angst.parse(gn));   //=> ['x', 'z']
