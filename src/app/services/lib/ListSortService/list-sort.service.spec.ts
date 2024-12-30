import { TestBed } from '@angular/core/testing';
import { ListSortService } from './list-sort.service';
import { ListSortPayload } from '../../../../types/api';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';

describe('ListSortService', () => {
  let service: ListSortService;
  const identifier = 'test-list';

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: ROOT_TESTING_PROVIDERS,
    });

    TestBed.runInInjectionContext(() => {
      service = new ListSortService(identifier);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty sort object if no stored value exists', () => {
    expect(service.sort()).not.toBeDefined();
  });

  it('should initialize with the stored sort value if it exists in localStorage', () => {
    TestBed.runInInjectionContext(() => {
      const storedSort: ListSortPayload = { field: 'name', order: 'ASC' };
      localStorage.setItem(
        `${identifier}__list-sort`,
        JSON.stringify(storedSort)
      );

      service = new ListSortService(identifier);
      expect(service.sort()).toEqual(storedSort);
    });
  });

  it('should update the sort value', () => {
    const newSort: ListSortPayload = { field: 'name', order: 'DESC' };
    service.setSort(newSort);
    expect(service.sort()).toEqual(newSort);
  });

  it('should update the localStorage when the sort value changes', () => {
    TestBed.runInInjectionContext(() => {
      const newSort: ListSortPayload = { field: 'age', order: 'ASC' };
      service.setSort(newSort);

      TestBed.flushEffects();

      expect(localStorage.getItem(`${identifier}__list-sort`)).toBe(
        JSON.stringify(newSort)
      );
    });
  });

  it('should initialize with the default sort value if provided', () => {
    TestBed.runInInjectionContext(() => {
      const defaultSort: ListSortPayload = { field: 'name', order: 'ASC' };
      service = new ListSortService(identifier, defaultSort);
      expect(service.sort()).toEqual(defaultSort);
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
      service = new ListSortService(identifier, defaultSort);

      TestBed.flushEffects();

      expect(service.sort()).toEqual(storedSort);
    });
  });
});
