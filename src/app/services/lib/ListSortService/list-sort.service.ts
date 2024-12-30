import { WritableSignal } from '@angular/core';
import { ListSortPayload } from '../../../../types/api';
import { storedSignal } from '../../../utils/signals';

/**
 * Manages the state and persistence of the sorting for a list with a given identifier
 */
export class ListSortService {
  private storageKeySuffix = 'list-sort';
  private storageKey: string;
  sort: WritableSignal<ListSortPayload>;

  setSort(s: ListSortPayload) {
    this.sort.set({ ...s });
  }

  constructor(identifier: string) {
    this.storageKey = `${identifier}__${this.storageKeySuffix}`;
    this.sort = storedSignal<ListSortPayload>(this.storageKey);
  }
}
