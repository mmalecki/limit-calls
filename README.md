# limit-calls
[![Build Status](https://travis-ci.org/mmalecki/limit-calls.png?branch=master)](https://travis-ci.org/mmalecki/limit-calls)

Limit number of parallel calls to an asynchronous function.

## Installation

```sh
npm install limit-calls
```

## Usage
```js
var limit = require('limit-calls');

function limitMe(arg, cb) {
  // There will only ever be 2 parallel calls to this function
  console.log(arg);
  setTimeout(cb, 100);
}

var f = limit(limitMe, 2);

f('Hello world');
f('Hello world');
f('Hello world');
f('Hello world');

// Execution of this script will take around 200 ms.
```
