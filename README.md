# angst [![npm Version](http://img.shields.io/npm/v/angst.svg?style=flat)](https://www.npmjs.org/package/angst) [![Build Status](https://img.shields.io/travis/yuanqing/angst.svg?style=flat)](https://travis-ci.org/yuanqing/angst) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/angst.svg?style=flat)](https://coveralls.io/r/yuanqing/angst)

> Named arguments for JavaScript, adapted from [AngularJS](https://github.com/angular/angular.js).

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

var gn = function(x, z) {
  if (typeof z === 'undefined') {
    return 'z is undefined';
  }
  return x;
};
console.log(angst(gn)(argObj)); //=> 'z is undefined'
```

Because code minification mangles variable names, **the above will work as expected only when unminified.** If we cannot guarantee this, we must pass in an additional string array of the function&rsquo;s argument names to `angst`. For example:

```js
var argObj = {
  x: 1,
  y: 2
};

var fn = function(x, y) {
  return x + y;
};
console.log(angst(fn, ['x', 'y'])(argObj)); //=> 3
```

See [the tests](https://github.com/yuanqing/angst/blob/master/test/index.js) for more usage examples.

## API

```js
var angst = require('angst');
```

### var gn = angst(fn [, argNames])

Takes a function `fn`, and returns a function `gn` that can be invoked using named arguments.

- `fn` &mdash; The function we want to invoke using named arguments. Throws if `fn` is not a function.
- `argNames` &mdash; A string array containing the names of the arguments expected by `fn`. **This is mandatory if your code is going to be minified.**

### gn(argObj [, context])

Applies arguments from `argObj` to our initial function `fn`, with `this` set to the specified `context`.

- `argObj` &mdash; An object literal that maps the argument names of `fn` to their values.
- `context` &mdash; The context for `this` when invoking `fn`.

### angst.parse(fn)

Returns a string array containing the names of the arguments expected by `fn`.

- `fn` &mdash; The function to be parsed. Throws if `fn` is not a function.

## Installation

Install via [npm](https://npmjs.com/):

```
$ npm i --save angst
```

## Credit

Most of this module&rsquo;s core logic and tests were adapted from AngularJS:
- [`src/auto/injector`](https://github.com/angular/angular.js/blob/6874cca1589a2a4c28f3caa036897c70e57763ef/src/auto/injector.js#L65-L117)
- [`test/auto/injectorSpec.js`](https://github.com/angular/angular.js/blob/ebde4681bd55683544611a5d358a9be916de1f21/test/auto/injectorSpec.js#L168-L247)

## Changelog

- 0.1.0
  - Initial release

## License

[MIT](https://github.com/yuanqing/angst/blob/master/LICENSE)
