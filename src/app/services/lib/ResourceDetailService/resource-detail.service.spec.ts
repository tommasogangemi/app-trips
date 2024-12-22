import { TestBed } from '@angular/core/testing';
import { ResourceDetailService } from './resource-detail.service';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';
import { ApiService } from '../ApiService/api.service';

describe('ResourceDetailService', () => {
  let service: ResourceDetailService<unknown>;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...ROOT_TESTING_PROVIDERS],
    });
    apiService = TestBed.inject(ApiService);
    service = new ResourceDetailService(apiService, 'test');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load', () => {
    it('should set loading to true and reset error before fetching data', async () => {
      spyOn(apiService, 'getOne').and.returnValue(Promise.resolve({}));

      service.load('123');
      expect(service.loading()).toBeTrue();
      expect(service.error()).toBeUndefined();
    });

    it('should set data property with the fetched data', async () => {
      const mockResponse = { id: '123', name: 'Test Item' };
      spyOn(apiService, 'getOne').and.returnValue(
        Promise.resolve(mockResponse)
      );

      await service.load('123');
      expect(service.data()).toEqual(mockResponse);
    });

    it('should set error property if fetching data fails', async () => {
      const mockError = new Error('Fetch error');
      spyOn(apiService, 'getOne').and.returnValue(Promise.reject(mockError));

      await service.load('123');
      expect(service.error()).toBe(mockError);
    });

    it('should set loading to false after fetching data', async () => {
      spyOn(apiService, 'getOne').and.returnValue(Promise.resolve({}));

      await service.load('123');
      expect(service.loading()).toBeFalse();
    });
  });
});
