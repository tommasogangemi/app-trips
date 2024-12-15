import { TestBed } from '@angular/core/testing';
import { ResourceListService } from './resource-list.service';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';
import { ApiService } from '../ApiService/api.service';
import { GetListResponse } from '../../../../types/api';

describe('ResourceListService', () => {
  let service: ResourceListService<unknown>;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...ROOT_TESTING_PROVIDERS, ResourceListService],
    });
    service = TestBed.inject(ResourceListService);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load', () => {
    it('should set loading to true and reset error before fetching data', async () => {
      spyOn(apiService, 'getList').and.returnValue(
        Promise.resolve({ items: [], total: 0, page: 1, limit: 10 })
      );

      service.load('test-endpoint');
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

      await service.load('test-endpoint');
      expect(service.data()).toEqual(mockResponse.items);
      expect(service.totalCount()).toBe(mockResponse.total);
      expect(service.page()).toBe(mockResponse.page);
    });

    it('should set error property if fetching data fails', async () => {
      const mockError = new Error('Fetch error');
      spyOn(apiService, 'getList').and.returnValue(Promise.reject(mockError));

      await service.load('test-endpoint');
      expect(service.error()).toBe(mockError);
    });

    it('should set loading to false after fetching data', async () => {
      spyOn(apiService, 'getList').and.returnValue(
        Promise.resolve({ items: [], total: 0, page: 1, limit: 10 })
      );

      await service.load('test-endpoint');
      expect(service.loading()).toBeFalse();
    });
  });
});
