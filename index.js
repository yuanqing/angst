'use strict';

// https://github.com/angular/angular.js/blob/6874cca1589a2a4c28f3caa036897c70e57763ef/src/auto/injector.js#L65-L117

var FN_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARGS_SPLIT = /,/;

var parse = function(fn) {

  if (typeof fn !== 'function') {
    throw new Error('not a function');
  }

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

var angst = function(fn, argKeys) {

  argKeys = argKeys || parse(fn);

  return function(argsMap, context) {
    var args = [];
    var i = -1;
    var len = argKeys.length;
    while (++i < len) {
      args.push(argsMap[argKeys[i]]);
    }
    return fn.apply(context, args);
  };

};

module.exports = angst;
module.exports.parse = parse;
