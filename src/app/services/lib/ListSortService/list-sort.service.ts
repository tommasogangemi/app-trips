import { WritableSignal } from '@angular/core';
import { ListSortPayload } from '../../../../types/api';
import { storedSignal } from '../../../utils/signals';

/**
 * Manages the state and persistence of the sorting for a list with a given identifier
 */
export class ListSortService {
  private storageKeySuffix = 'list-sort';
  private identifier: string;
  sort: WritableSignal<ListSortPayload | undefined>;

  setSort(s: ListSortPayload) {
    this.sort.set({ ...s });
  }

  resetSort() {
    this.sort.set(undefined);
  }

  constructor(identifier: string, defaultSort?: ListSortPayload) {
    this.identifier = `${identifier}__${this.storageKeySuffix}`;
    this.sort = storedSignal<ListSortPayload>(this.identifier, defaultSort);
  }
}
