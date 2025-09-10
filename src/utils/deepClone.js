export default function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;

  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof RegExp) return new RegExp(value);
  if (value instanceof Map) {
    const m = new Map();
    seen.set(value, m);
    for (const [k, v] of value.entries()) {
      m.set(deepClone(k, seen), deepClone(v, seen));
    }
    return m;
  }
  if (value instanceof Set) {
    const s = new Set();
    seen.set(value, s);
    for (const v of value.values()) s.add(deepClone(v, seen));
    return s;
  }
  if (Array.isArray(value)) {
    if (seen.has(value)) return seen.get(value);
    const arr = [];
    seen.set(value, arr);
    for (const item of value) arr.push(deepClone(item, seen));
    return arr;
  }
  if (seen.has(value)) return seen.get(value);
  const out = {};
  seen.set(value, out);
  for (const key of Object.keys(value)) {
    out[key] = deepClone(value[key], seen);
  }
  return out;
}

