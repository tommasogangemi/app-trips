import { TestBed } from '@angular/core/testing';
import { ResourceDetailService } from './resource-detail.service';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';
import { ApiService } from '../ApiService/api.service';

describe('ResourceDetailService', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let service: ResourceDetailService<any, any>;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: ROOT_TESTING_PROVIDERS,
    });
    apiService = TestBed.inject(ApiService);
    service = new ResourceDetailService(apiService, 'test', (r) => r);
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

    it('should not refetch if the id is equal to the id of the trip already present', async () => {
      const mockResponse = { id: '123', name: 'Test Item' };
      service.data.set(mockResponse);

      const fetchSpy = spyOn(apiService, 'getOne');

      await service.load('123');
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });

  describe('transform function', () => {
    it('should transform the fetched data using the provided transform function', async () => {
      const transformFn = (item: { id: string }) => ({
        ...item,
        transformed: true,
      });
      service = new ResourceDetailService(apiService, 'test', transformFn);

      const mockResponse = { id: '123' };
      spyOn(apiService, 'getOne').and.returnValue(
        Promise.resolve(mockResponse)
      );

      await service.load('123');
      expect(service.data()).toEqual({ id: '123', transformed: true });
    });
  });
});
