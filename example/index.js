'use strict';

var angst = require('..');

var fn = function(x, y) {
  return x + y;
};
var argObj = {
  x: 1,
  y: 2
};
console.log(angst(fn)(argObj)); //=> 3
console.log(angst.parse(fn));   //=> ['x', 'y']
