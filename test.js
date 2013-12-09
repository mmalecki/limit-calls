var assert = require('assert');
var limit = require('./');

var ongoing = 0;
var callbacks = 0;
var LIMIT = 4;
var CALLS = 16;

var FUNCTION_CONTEXT = { foo: 'bar' };
var CALLBACK_CONTEXT = { bar: 'foo' };

function callback(arg) {
  assert(ongoing <= LIMIT);
  assert.equal(this, CALLBACK_CONTEXT);
  assert.equal(arg, 'world');
  --ongoing;
  ++callbacks;
}

function limitMe(arg, cb) {
  ++ongoing;
  assert(ongoing <= LIMIT);
  assert.equal(FUNCTION_CONTEXT, this);
  assert.equal(arg, 'hello');
  setTimeout(function () {
    cb.call(CALLBACK_CONTEXT, 'world');
  }, Math.floor(10 * Math.random()));
}

var f = limit(limitMe, LIMIT);

for (var i = 0; i < CALLS; i++) {
  f.call(FUNCTION_CONTEXT, 'hello', callback);
}

process.on('exit', function () {
  assert.equal(callbacks, CALLS);
  assert.equal(ongoing, 0);
});
