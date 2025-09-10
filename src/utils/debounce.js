export function debounce(fun, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fun(...args);
    }, delay);
  };
}
