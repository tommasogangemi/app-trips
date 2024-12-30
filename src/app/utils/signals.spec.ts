import { TestBed } from '@angular/core/testing';
import { storedSignal } from './signals';
import { ROOT_TESTING_PROVIDERS } from './testing';

describe('storedSignal', () => {
  const storageKey = 'testKey';

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();

    TestBed.configureTestingModule({
      providers: ROOT_TESTING_PROVIDERS,
    });
  });

  it('should initialize with the default value if no stored value exists', () => {
    TestBed.runInInjectionContext(() => {
      const signal = storedSignal('defaultValue', storageKey);
      expect(signal()).toBe('defaultValue');
    });
  });

  it('should initialize with the stored value if it exists in localStorage', () => {
    TestBed.runInInjectionContext(() => {
      localStorage.setItem(storageKey, JSON.stringify('storedValue'));
      const signal = storedSignal('defaultValue', storageKey);
      expect(signal()).toBe('storedValue');
    });
  });

  it('should initialize with the stored value if it exists in sessionStorage', () => {
    TestBed.runInInjectionContext(() => {
      sessionStorage.setItem(storageKey, JSON.stringify('storedValue'));
      const signal = storedSignal('defaultValue', storageKey, 'session');
      expect(signal()).toBe('storedValue');
    });
  });

  it('should update the localStorage when the signal value changes', () => {
    TestBed.runInInjectionContext(() => {
      const signal = storedSignal('defaultValue', storageKey);
      signal.set('newValue');

      TestBed.flushEffects();

      expect(localStorage.getItem(storageKey)).toBe('newValue');
    });
  });

  it('should update the sessionStorage when the signal value changes', () => {
    TestBed.runInInjectionContext(() => {
      const signal = storedSignal('defaultValue', storageKey, 'session');
      signal.set('newValue');

      TestBed.flushEffects();

      expect(sessionStorage.getItem(storageKey)).toBe('newValue');
    });
  });

  it('should not overwrite the stored value if the default value is undefined', () => {
    TestBed.runInInjectionContext(() => {
      localStorage.setItem(storageKey, JSON.stringify('storedValue'));
      const signal = storedSignal(undefined, storageKey);
      expect(signal()).toBe('storedValue');
    });
  });
});
