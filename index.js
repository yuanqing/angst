'use strict';

// Adapted from: https://github.com/angular/angular.js/blob/6874cca1589a2a4c28f3caa036897c70e57763ef/src/auto/injector.js#L65-L117

var FN_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARGS_SPLIT = /,/;

var assertIsFunction = function(fn) {
  if (typeof fn !== 'function') {
    throw new Error('not a function');
  }
};

var parse = function(fn) {

  assertIsFunction(fn);

  var args = fn.toString()
               .replace(FN_COMMENTS, '')
               .match(FN_ARGS)[1]
               .split(FN_ARGS_SPLIT);

  var result = [];
  var i = -1;
  var len = args.length;
  while (++i < len) {
    var arg = args[i].trim();
    if (arg.length) {
      result.push(arg);
    }
  }
  return result;

};

var angst = function(fn, argNames) {

  if (typeof argNames !== 'undefined') {
    assertIsFunction(fn);
    argNames = [].concat(argNames);
  } else {
    argNames = parse(fn);
  }

  return function(argObj, context) {
    var args = [];
    var i = -1;
    var len = argNames.length;
    while (++i < len) {
      args.push(argObj[argNames[i]]);
    }
    return fn.apply(context, args);
  };

};

module.exports = angst;
module.exports.parse = parse;
