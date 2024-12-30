import { computed } from '@angular/core';
import { ListQueryPayload, ListSortPayload } from '../../../../types/api';
import { ListSortService } from '../ListSortService/list-sort.service';

/**
 * Service to manage the compound state of a list view.
 *
 * Wraps the {@link ListSortService} to manage sorting state.
 * TODO: Wraps the {@link ListFiltersService} to manage filter state.
 *
 * Exposes the reactive {@link ListQueryPayload} to use as query for API calls
 */
export class ListViewService {
  private identifier: string;
  sortService: ListSortService;

  listQueryPayload = computed<ListQueryPayload>(() => ({
    sort: this.sortService.sort(),
    // filters: this.filtersService.filters(),
  }));

  constructor(identifier: string, defaultSort?: ListSortPayload) {
    this.identifier = identifier;
    this.sortService = new ListSortService(this.identifier, defaultSort);
  }
}
