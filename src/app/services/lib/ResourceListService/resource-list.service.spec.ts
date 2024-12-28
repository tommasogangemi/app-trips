import { TestBed } from '@angular/core/testing';
import { ResourceListService } from './resource-list.service';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';
import { ApiService } from '../ApiService/api.service';
import { GetListResponse } from '../../../../types/api';

describe('ResourceListService', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let service: ResourceListService<any, any>;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...ROOT_TESTING_PROVIDERS],
    });
    apiService = TestBed.inject(ApiService);
    service = new ResourceListService(apiService, 'test', (r) => r);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load', () => {
    it('should set loading to true and reset error before fetching data', async () => {
      spyOn(apiService, 'getList').and.returnValue(
        Promise.resolve({ items: [], total: 0, page: 1, limit: 10 })
      );

      service.load();
      expect(service.loading()).toBeTrue();
      expect(service.error()).toBeUndefined();
    });

    it('should set data, totalCount, and page properties with the fetched data', async () => {
      const mockResponse: GetListResponse<unknown> = {
        items: [{ id: 1 }],
        total: 1,
        page: 1,
        limit: 10,
      };
      spyOn(apiService, 'getList').and.returnValue(
        Promise.resolve(mockResponse)
      );

      await service.load();
      expect(service.data()).toEqual(mockResponse.items);
      expect(service.totalCount()).toBe(mockResponse.total);
      expect(service.pagination().page).toBe(mockResponse.page);
    });

    it('should set error property if fetching data fails', async () => {
      const mockError = new Error('Fetch error');
      spyOn(apiService, 'getList').and.returnValue(Promise.reject(mockError));

      await service.load();
      expect(service.error()).toBe(mockError);
    });

    it('should set loading to false after fetching data', async () => {
      spyOn(apiService, 'getList').and.returnValue(
        Promise.resolve({ items: [], total: 0, page: 1, limit: 10 })
      );

      await service.load();
      expect(service.loading()).toBeFalse();
    });

    it('should concatenate new data to existing data when keepData is true', async () => {
      const initialData = [{ id: 1 }];
      const newData = [{ id: 2 }];
      service.data.set(initialData);

      const mockResponse: GetListResponse<unknown> = {
        items: newData,
        total: 2,
        page: 2,
        limit: 10,
      };
      spyOn(apiService, 'getList').and.returnValue(
        Promise.resolve(mockResponse)
      );

      await service.load({}, { keepData: true });
      expect(service.data()).toEqual([...initialData, ...newData]);
      expect(service.totalCount()).toBe(mockResponse.total);
      expect(service.pagination().page).toBe(mockResponse.page);
    });
  });

  describe('loadNextPage', () => {
    it('should load the next page of data and concatenate it to existing data', async () => {
      const initialData = [{ id: 1 }];
      const nextPageData = [{ id: 2 }];
      service.data.set(initialData);

      const mockResponse: GetListResponse<unknown> = {
        items: nextPageData,
        total: 2,
        page: 2,
        limit: 10,
      };
      spyOn(apiService, 'getList').and.returnValue(
        Promise.resolve(mockResponse)
      );

      await service.loadNextPage();
      expect(service.data()).toEqual([...initialData, ...nextPageData]);
      expect(service.pagination().page).toBe(mockResponse.page);
    });
  });

  describe('hasNextPage', () => {
    it('should return true if there are more pages to load', () => {
      service.totalCount.set(20);
      service.pagination.set({ page: 1, limit: 10 });

      expect(service.hasNextPage()).toBeTrue();
    });

    it('should return false if there are no more pages to load', () => {
      service.totalCount.set(10);
      service.pagination.set({ page: 1, limit: 10 });
      service.data.set(Array.from({ length: 10 }, (_, i) => ({ id: i + 1 })));

      expect(service.hasNextPage()).toBeFalse();
    });
  });

  describe('transform function', () => {
    it('should transform the fetched data using the provided transform function', async () => {
      const transformFn = (item: { id: number }) => ({
        ...item,
        transformed: true,
      });
      service = new ResourceListService(apiService, 'test', transformFn);

      const mockResponse: GetListResponse<{ id: number }> = {
        items: [{ id: 1 }],
        total: 1,
        page: 1,
        limit: 10,
      };
      spyOn(apiService, 'getList').and.returnValue(
        Promise.resolve(mockResponse)
      );

      await service.load();
      expect(service.data()).toEqual([{ id: 1, transformed: true }]);
    });
  });
});
