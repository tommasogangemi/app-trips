import { TestBed } from '@angular/core/testing';
import { TripsService } from './trips.service';
import { ROOT_TESTING_PROVIDERS } from '../../utils/testing';
import { ApiService } from '../lib/ApiService/api.service';
import { ResourceListService } from '../lib/ResourceListService/resource-list.service';
import { Trip } from '../../../types/trips';

describe('TripsService', () => {
  let service: TripsService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: ROOT_TESTING_PROVIDERS,
    });
    service = TestBed.inject(TripsService);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('list', () => {
    it('should have a ResourceListService instance for trips', () => {
      expect(service.list).toBeInstanceOf(ResourceListService);
    });

    it('should load trips using the ResourceListService', async () => {
      const mockResponse = {
        items: [{ id: '1' } as Trip],
        total: 1,
        page: 1,
        limit: 10,
      };
      spyOn(apiService, 'getList').and.returnValue(
        Promise.resolve(mockResponse)
      );

      await service.list.load('trips-endpoint');
      expect(service.list.list()).toEqual(mockResponse.items);
      expect(service.list.totalCount()).toBe(mockResponse.total);
      expect(service.list.page()).toBe(mockResponse.page);
    });

    it('should handle errors when loading trips', async () => {
      const mockError = new Error('Fetch error');
      spyOn(apiService, 'getList').and.returnValue(Promise.reject(mockError));

      await service.list.load('trips-endpoint');
      expect(service.list.error()).toBe(mockError);
    });
  });
});
