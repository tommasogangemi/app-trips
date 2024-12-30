import { TestBed } from '@angular/core/testing';
import { ListViewService } from './list-view.service';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';
import { ListSortPayload } from '../../../../types/api';

describe('ListViewService', () => {
  let service: ListViewService;
  const identifier = 'test-list';

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: ROOT_TESTING_PROVIDERS,
    });

    TestBed.runInInjectionContext(() => {
      service = new ListViewService(identifier);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should integrate with ListSortService to set and get sort values', () => {
    const sortPayload: ListSortPayload = { field: 'name', order: 'ASC' };
    service.sortService.setSort(sortPayload);

    expect(service.sortService.sort()).toEqual(sortPayload);
  });

  it('should update the sort value in ListSortService when setSort is called', () => {
    const newSortPayload: ListSortPayload = { field: 'age', order: 'DESC' };
    service.sortService.setSort(newSortPayload);

    expect(service.sortService.sort()).toEqual(newSortPayload);
  });

  it('should initialize with the default sort value if provided', () => {
    TestBed.runInInjectionContext(() => {
      const defaultSort: ListSortPayload = { field: 'name', order: 'ASC' };
      service = new ListViewService(identifier, defaultSort);
      expect(service.sortService.sort()).toEqual(defaultSort);
    });
  });

  it('should overwrite the default sort value if a stored value exists', () => {
    TestBed.runInInjectionContext(() => {
      const storedSort: ListSortPayload = { field: 'name', order: 'DESC' };
      localStorage.setItem(
        `${identifier}__list-sort`,
        JSON.stringify(storedSort)
      );

      const defaultSort: ListSortPayload = { field: 'name', order: 'ASC' };
      service = new ListViewService(identifier, defaultSort);

      TestBed.flushEffects();

      expect(service.sortService.sort()).toEqual(storedSort);
    });
  });
});
