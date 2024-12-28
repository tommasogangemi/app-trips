import { storedSignal } from './signals';

xdescribe('storedSignal', () => {
  const storageKey = 'testKey';

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should initialize with the default value if no stored value exists', () => {
    const signal = storedSignal('defaultValue', storageKey);
    expect(signal()).toBe('defaultValue');
  });

  it('should initialize with the stored value if it exists in localStorage', () => {
    localStorage.setItem(storageKey, JSON.stringify('storedValue'));
    const signal = storedSignal('defaultValue', storageKey);
    expect(signal()).toBe('storedValue');
  });

  it('should initialize with the stored value if it exists in sessionStorage', () => {
    sessionStorage.setItem(storageKey, JSON.stringify('storedValue'));
    const signal = storedSignal('defaultValue', storageKey, 'session');
    expect(signal()).toBe('storedValue');
  });

  it('should update the localStorage when the signal value changes', () => {
    const signal = storedSignal('defaultValue', storageKey);
    signal.set('newValue');
    expect(localStorage.getItem(storageKey)).toBe(JSON.stringify('newValue'));
  });

  it('should update the sessionStorage when the signal value changes', () => {
    const signal = storedSignal('defaultValue', storageKey, 'session');
    signal.set('newValue');
    expect(sessionStorage.getItem(storageKey)).toBe(JSON.stringify('newValue'));
  });

  it('should not overwrite the stored value if the default value is undefined', () => {
    localStorage.setItem(storageKey, JSON.stringify('storedValue'));
    const signal = storedSignal(undefined, storageKey);
    expect(signal()).toBe('storedValue');
  });
});
