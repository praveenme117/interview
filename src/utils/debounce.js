// Simple debounce implementation
export default function debounce(fn, wait = 300, options = {}) {
  const { leading = false, trailing = true } = options;
  let timer = null;
  let lastArgs;
  let lastThis;
  let result;
  let invoked = false;

  const invoke = () => {
    timer = null;
    if (trailing && invoked) {
      result = fn.apply(lastThis, lastArgs);
      lastArgs = lastThis = undefined;
      invoked = false;
    }
  };

  const debounced = function (...args) {
    lastArgs = args;
    lastThis = this;
    invoked = true;
    const shouldCallNow = leading && !timer;
    if (timer) clearTimeout(timer);
    timer = setTimeout(invoke, wait);
    if (shouldCallNow) {
      result = fn.apply(lastThis, lastArgs);
      invoked = false; // consumed by leading call
    }
    return result;
  };

  debounced.cancel = () => { if (timer) { clearTimeout(timer); timer = null; } lastArgs = lastThis = undefined; invoked = false; };
  debounced.flush = () => { if (timer) { clearTimeout(timer); invoke(); } return result; };

  return debounced;
}

