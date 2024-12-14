import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  APIQueryPayload,
  GetListResponse,
  ListQueryPayload,
} from '../../types/api';

const getQsFromQueryPayload = (p: ListQueryPayload = {}): string => {
  const mappedPayload: APIQueryPayload = {
    sortBy: p.sort?.field,
    sortOrder: p.sort?.order,
    page: p.pagination?.page,
    limit: p.pagination?.limit,
    ...p.filter,
  };

  return Object.entries(mappedPayload)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

@Injectable({
  providedIn: 'root',
})
export class GetListService<T> {
  get(endpoint: string, queryPayload: ListQueryPayload = {}) {
    const qs = getQsFromQueryPayload(queryPayload);
    const endpointWithQuery = `${endpoint}${qs ? `?${qs}` : ''}`;

    return this.http.get<GetListResponse<T>>(endpointWithQuery, {});
  }

  test() {
    this.get(
      'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips'
    ).subscribe((res) => {
      console.log('aaaaaaaaaaaaaa TEST', res.items);
    });
  }

  constructor(private http: HttpClient) {}
}
