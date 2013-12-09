function callDone(ctx, queued, func, canShift) {
  if (canShift && queued.length) {
    var args = queued.shift();
    func.apply(ctx, args);
    return true;
  }
}

module.exports = function (func, limit) {
  var queued = [];
  var ongoing = 0;

  return function () {
    var i = arguments.length - 1;
    var cb = arguments[i];
    var fCtx = this;

    arguments[i] = function () {
      cb.apply(this, arguments);
      if (!callDone(fCtx, queued, func, ongoing <= limit)) {
        --ongoing;
      }
    };

    if (ongoing === limit) {
      queued.push(arguments);
      return;
    }
    ++ongoing;

    func.apply(fCtx, arguments);
  }
};
