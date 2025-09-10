import debounce from '../../utils/debounce';

jest.useFakeTimers();

describe('debounce', () => {
  test('calls after wait on trailing by default', () => {
    const fn = jest.fn();
    const d = debounce(fn, 200);
    d('a');
    d('b');
    jest.advanceTimersByTime(199);
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('b');
  });

  test('leading option calls immediately', () => {
    const fn = jest.fn();
    const d = debounce(fn, 200, { leading: true, trailing: false });
    d('x');
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('x');
    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('cancel prevents trailing call', () => {
    const fn = jest.fn();
    const d = debounce(fn, 200);
    d('a');
    d('b');
    d.cancel();
    jest.advanceTimersByTime(500);
    expect(fn).not.toHaveBeenCalled();
  });

  test('flush triggers immediate trailing call', () => {
    const fn = jest.fn();
    const d = debounce(fn, 200);
    d('a');
    jest.advanceTimersByTime(100);
    d.flush();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('a');
  });
});

