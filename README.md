# angst [![npm Version](http://img.shields.io/npm/v/angst.svg?style=flat)](https://www.npmjs.org/package/angst) [![Build Status](https://img.shields.io/travis/yuanqing/angst.svg?style=flat)](https://travis-ci.org/yuanqing/angst) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/angst.svg?style=flat)](https://coveralls.io/r/yuanqing/angst)

> Named arguments for JavaScript, &agrave; la [AngularJS](https://angularjs.org/).

Note: Most of this module&rsquo;s [core logic](https://github.com/angular/angular.js/blob/6874cca1589a2a4c28f3caa036897c70e57763ef/src/auto/injector.js#L65-L117) and [tests](https://github.com/angular/angular.js/blob/ebde4681bd55683544611a5d358a9be916de1f21/test/auto/injectorSpec.js#L168-L247) were adapted from AngularJS.

## Usage

```js
'use strict';

var angst = require('angst');

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
```

- Arguments not found in `argObj` will be passed in as `undefined`.

More usage examples are in [the tests](https://github.com/yuanqing/angst/blob/master/test/index.js).

## API

```js
var angst = require('angst');
```

### angst(fn [, argNames])

Takes a function `fn` and returns a function that can be invoked with an object literal (that maps the argument names of `fn` to their values). See [the example](#usage).

- `fn` &mdash; The function we want to call using named arguments. Throws if `fn` is not a function.
- `argNames` &mdash; A string array containing the names of the arguments expected by `fn`. **This is optional if and only if your code is *not* going to be minified.**

### angst.parse(fn)

Returns a string array containing the names of the arguments expected by the function `fn`.

- `fn` &mdash; The function to be parsed.

## Installation

Install via [npm](https://npmjs.com/):

```
$ npm i --save angst
```

## Changelog

- 0.1.0
  - Initial release

## License

[MIT](https://github.com/yuanqing/angst/blob/master/LICENSE)
