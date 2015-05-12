# angst [![npm Version](http://img.shields.io/npm/v/angst.svg?style=flat)](https://www.npmjs.org/package/angst) [![Build Status](https://img.shields.io/travis/yuanqing/angst.svg?style=flat)](https://travis-ci.org/yuanqing/angst) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/angst.svg?style=flat)](https://coveralls.io/r/yuanqing/angst)

> Named arguments for JavaScript, &agrave; la [AngularJS](https://angularjs.org/).

Note: This module&rsquo;s [core logic](https://github.com/angular/angular.js/blob/6874cca1589a2a4c28f3caa036897c70e57763ef/src/auto/injector.js#L65-L117) and [tests](https://github.com/angular/angular.js/blob/ebde4681bd55683544611a5d358a9be916de1f21/test/auto/injectorSpec.js#L168-L247) were extracted from AngularJS.

## Example

```js
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
```

More usage examples are in [the tests](https://github.com/yuanqing/angst/blob/master/test).

## API

```js
var angst = require('angst');
```

### angst(fn [, argNames])

Takes a function `fn` and returns a function that can be invoked using named arguments, ie. an object literal that maps the argument names of `fn` to their values.

- `fn` &mdash; The function we want to call using using named arguments.
- `argNames` &mdash; A string array containing the names of the arguments expected by `fn`. **This is optional if and only if your code is *not* going to be minified.**

### angst.parse(fn)

Returns a string array containing the names of the arguments expected by the function `fn`.

- `fn` &mdash; The function to be parsed.

## Installation

Install via [npm](https://npmjs.com/):

```
$ npm i --save angst
```

## License

[MIT](https://github.com/yuanqing/angst/blob/master/LICENSE)
