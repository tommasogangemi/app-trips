import { TestBed } from '@angular/core/testing';
import { transformTripResponse, TripsService } from './trips.service';
import { ROOT_TESTING_PROVIDERS } from '../../utils/testing';
import { ApiService } from '../lib/ApiService/api.service';
import { ResourceListService } from '../lib/ResourceListService/resource-list.service';
import { ResourceDetailService } from '../lib/ResourceDetailService/resource-detail.service';
import { TripResponse } from '../../resources/trips/trips';

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
      const tripResponse: TripResponse = {
        id: '1',
        title: 'Test Trip',
        description: 'Test description',
        price: 100,
        rating: 4,
        nrOfRatings: 10,
        verticalType: 'car',
        tags: ['test'],
        co2: 10,
        thumbnailUrl: 'test',
        imageUrl: 'test',
        creationDate: '2021-01-01',
      };

      const mockResponse = {
        items: [tripResponse],
        total: 1,
        page: 1,
        limit: 10,
      };
      spyOn(apiService, 'getList').and.returnValue(
        Promise.resolve(mockResponse)
      );

      await service.list.load();
      expect(service.list.data()).toEqual(
        mockResponse.items.map(transformTripResponse)
      );
      expect(service.list.totalCount()).toBe(mockResponse.total);
      expect(service.list.pagination().page).toBe(mockResponse.page);
    });

    it('should handle errors when loading trips', async () => {
      const mockError = new Error('Fetch error');
      spyOn(apiService, 'getList').and.returnValue(Promise.reject(mockError));

      await service.list.load();
      expect(service.list.error()).toBe(mockError);
    });
  });

  describe('detail', () => {
    it('should have a ResourceDetailService instance for trip details', () => {
      expect(service.detail).toBeInstanceOf(ResourceDetailService);
    });

    it('should load trip details using the ResourceDetailService', async () => {
      const mockResponse: TripResponse = {
        id: '1',
        title: 'Test Trip',
        description: 'Test description',
        price: 100,
        rating: 4,
        nrOfRatings: 10,
        verticalType: 'car',
        tags: ['test'],
        co2: 10,
        thumbnailUrl: 'test',
        imageUrl: 'test',
        creationDate: '2021-01-01',
      };
      spyOn(apiService, 'getOne').and.returnValue(
        Promise.resolve(mockResponse)
      );

      await service.detail.load('1');
      expect(service.detail.data()).toEqual(
        transformTripResponse(mockResponse)
      );
    });

    it('should handle errors when loading trip details', async () => {
      const mockError = new Error('Fetch error');
      spyOn(apiService, 'getOne').and.returnValue(Promise.reject(mockError));

      await service.detail.load('1');
      expect(service.detail.error()).toBe(mockError);
    });
  });
});
