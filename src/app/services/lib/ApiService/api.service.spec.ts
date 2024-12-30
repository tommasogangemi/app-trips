import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { ListQueryPayload, GetListResponse } from '../../../../types/api';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';
import { WithId } from '../../../../types/common/object';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: ROOT_TESTING_PROVIDERS,
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getList', () => {
    it('should invoke the fetch method with the correct endpoint and query string', async () => {
      const endpoint = 'test-endpoint';

      const fetchSpy = spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response('{}'))
      );

      await service.getList(endpoint);

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/test-endpoint',
        {}
      );
    });

    it('should invoke the fetch method with the correct endpoint and query string when passed a complex query payload', async () => {
      const endpoint = 'test-endpoint';
      const payload: ListQueryPayload = {
        sort: { field: 'name', order: 'ASC' },
        pagination: { page: 1, limit: 10 },
        filter: { status: 'active' },
      };

      const fetchSpy = spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response('{}'))
      );

      await service.getList(endpoint, payload);

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/test-endpoint?sortBy=name&sortOrder=ASC&page=1&limit=10&status=active',
        {}
      );
    });

    it('should return the response of the fetch call when invoked', async () => {
      const endpoint = 'test-endpoint';
      const payload: ListQueryPayload = {
        sort: { field: 'name', order: 'ASC' },
        pagination: { page: 1, limit: 10 },
        filter: { status: 'active' },
      };
      const mockResponse: GetListResponse<WithId> = {
        items: [],
        total: 0,
        page: 1,
        limit: 10,
      };

      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(JSON.stringify(mockResponse)))
      );

      const response = await service.getList(endpoint, payload);
      expect(response).toEqual(mockResponse);
    });
  });

  describe('getOne', () => {
    it('should invoke the fetch method with the correct endpoint and id', async () => {
      const endpoint = 'test-endpoint';
      const id = '123';

      const fetchSpy = spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response('{}'))
      );

      await service.getOne(endpoint, id);

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/test-endpoint/123',
        {}
      );
    });

    it('should return the response of the fetch call when invoked', async () => {
      const endpoint = 'test-endpoint';
      const id = '123';
      const mockResponse = { id: '123', name: 'Test Item' };

      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(JSON.stringify(mockResponse)))
      );

      const response = await service.getOne(endpoint, id);
      expect(response).toEqual(mockResponse);
    });
  });
});
