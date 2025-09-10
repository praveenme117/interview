import deepClone from '../../utils/deepClone';

describe('deepClone', () => {
  test('clones primitives', () => {
    expect(deepClone(1)).toBe(1);
    expect(deepClone('a')).toBe('a');
    expect(deepClone(null)).toBeNull();
    expect(deepClone(undefined)).toBeUndefined();
  });

  test('clones arrays and objects deeply', () => {
    const obj = { a: 1, b: { c: [1, 2, { d: 3 }] } };
    const copy = deepClone(obj);
    expect(copy).toEqual(obj);
    expect(copy).not.toBe(obj);
    expect(copy.b).not.toBe(obj.b);
    expect(copy.b.c).not.toBe(obj.b.c);
  });

  test('handles Date and RegExp', () => {
    const d = new Date();
    const r = /test/gi;
    const obj = { d, r };
    const copy = deepClone(obj);
    expect(copy.d.getTime()).toBe(d.getTime());
    expect(copy.r.source).toBe(r.source);
    expect(copy.r.flags).toBe(r.flags);
  });

  test('handles Map and Set', () => {
    const m = new Map([[{ k: 1 }, new Set([1, 2])]]);
    const copy = deepClone(m);
    expect(copy).not.toBe(m);
    const [[copyKey, copyVal]] = Array.from(copy.entries());
    expect(copyKey).toEqual({ k: 1 });
    expect(copyVal).toEqual(new Set([1, 2]));
  });

  test('handles circular references', () => {
    const obj = { name: 'x' };
    obj.self = obj;
    const copy = deepClone(obj);
    expect(copy).not.toBe(obj);
    expect(copy.self).toBe(copy);
  });
});

