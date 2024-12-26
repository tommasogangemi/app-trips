import { effect, signal } from '@angular/core';

type StorageType = 'local' | 'session';

export const storedSignal = <T>(
  defaultValue: T,
  storageKey: string,
  storageType: StorageType = 'local'
) => {
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  const storedValue = storage.getItem(storageKey);
  const defaultValueFromStorage = storedValue
    ? JSON.parse(storedValue)
    : defaultValue;

  const wrappedSignal = signal(defaultValueFromStorage ?? defaultValue);

  effect(() => {
    storage.setItem(storageKey, wrappedSignal());
  });

  return wrappedSignal;
};
