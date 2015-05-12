'use strict';

// https://github.com/angular/angular.js/blob/ebde4681bd55683544611a5d358a9be916de1f21/test/auto/injectorSpec.js#L168-L247

var test = require('tape');
var angst = require('..');

test('angst.parse(fn)', function(t) {

  var parse = angst.parse;

  t.test('is a function', function(t) {
    t.true(typeof angst === 'function');
    t.end();
  });

  t.test('throws if `fn` is not a function', function(t) {
    t.throws(function() {
      parse({});
    });
    t.end();
  });

  t.test('no arguments', function(t) {
    t.looseEqual(parse(function fn() {}), []);
    t.looseEqual(parse(function() {}), []);
    t.looseEqual(parse(function  () {}), []);
    t.looseEqual(parse(function /* */ () {}), []);
    t.looseEqual(parse(function(/* */) {}), []);
    t.end();
  });

  t.test('single argument', function(t) {
    /* jshint unused: false, camelcase: false */
    function beforeEachFn(_foo_) { /* foo = _foo_ */ }
    t.looseEqual(parse(beforeEachFn), ['_foo_']);
    t.end();
  });

  t.test('multiple arguments', function(t) {
    /* jshint unused: false, camelcase: false */
    var extraParans = function() {};
    function $f_n0 /*
        */(
        $a, // x, <-- looks like an arg but it is a comment
        b_, /* z, <-- looks like an arg but it is a
               multi-line comment
               function(a, b) {}
               */
        _c,
        /* {some type} */ d) { extraParans();}
    t.looseEqual(parse($f_n0), ['$a', 'b_', '_c', 'd']);
    t.end();
  });

});

test('angst(fn [, argKeys])', function(t) {

  t.test('throws if `fn` is not a function', function(t) {
    t.throws(function() {
      angst({});
    });
    t.end();
  });

  t.test('returns a function', function(t) {
    var fn = angst(function() {});
    t.true(typeof fn === 'function');
    t.end();
  });

  t.test('passes in arguments from `argsMap`', function(t) {
    var arr = [];
    var fn = function(x, y) {
      arr.push([x, y]);
    };
    var argsMap = {
      x: 1,
      y: 2
    };
    angst(fn)(argsMap);
    t.looseEqual(arr, [[1, 2]]);
    t.end();
  });

  t.test('arguments not in `argsMap` are passed in as `undefined`', function(t) {
    var arr = [];
    var fn = function(x, y) {
      arr.push([x, y]);
    };
    var argsMap = {
      x: 1
    };
    angst(fn)(argsMap);
    t.looseEqual(arr, [[1, undefined]]);
    t.end();
  });

  t.test('uses the keys in `argKeys`', function(t) {
    var arr = [];
    var fn = function(x, y) {
      arr.push([x, y]);
    };
    var argKeys = ['a', 'b'];
    var argsMap = {
      x: 1, // because of `argKeys`, we need an argument named `a`, not `x`
      b: 2
    };
    angst(fn, argKeys)(argsMap);
    t.looseEqual(arr, [[undefined, 2]]);
    t.end();
  });

});
