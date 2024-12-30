import { effect, signal } from '@angular/core';

type StorageType = 'local' | 'session';

export const storedSignal = <T>(
  storageKey: string,
  defaultValue?: T,
  storageType: StorageType = 'local'
) => {
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  const storedValue = storage.getItem(storageKey);
  const defaultValueFromStorage = storedValue
    ? JSON.parse(storedValue)
    : defaultValue;

  const wrappedSignal = signal<T>(defaultValueFromStorage ?? defaultValue);

  effect(() => {
    const signalValue = wrappedSignal();

    if (signalValue) {
      storage.setItem(storageKey, JSON.stringify(signalValue));
    } else {
      storage.removeItem(storageKey);
    }
  });

  return wrappedSignal;
};
