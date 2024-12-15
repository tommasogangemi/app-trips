import { inject, Injectable } from '@angular/core';
import {
  APIQueryPayload,
  GetListResponse,
  ListQueryPayload,
} from '../../../types/api';
import { FetchServiceBase } from '../FetchServiceBase/FetchServiceBase';
import { BA_APP_CONFIG } from '../../config/ba-app';

@Injectable({
  providedIn: 'root',
})
/**
 * Interface between the app and the API,
 * handles transformation from App domain models to HTTP ones
 */
export class GetListService extends FetchServiceBase {
  /**
   * Transforms the App domain query payload to the API query string
   *
   * @param payload the App domain query payload
   * @returns the query string with the correct format for the API
   */
  private getQsFromQueryPayload(payload: ListQueryPayload = {}): string {
    const mappedPayload: APIQueryPayload = {
      sortBy: payload.sort?.field,
      sortOrder: payload.sort?.order,
      page: payload.pagination?.page,
      limit: payload.pagination?.limit,
      ...payload.filter,
    };

    return Object.entries(mappedPayload)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }

  /**
   * Appends the query string to the endpoint
   *
   * @param endpoint the relative endpoint of the needed resource
   * @param queryPayload the App domain query payload
   * @returns the endpoint with the correct query string compliant with the API
   */
  private getEndpointWithQuery(
    endpoint: string,
    queryPayload: ListQueryPayload = {}
  ): string {
    const qs = this.getQsFromQueryPayload(queryPayload);
    return `${this.getEndpointWithRoot(endpoint)}${qs ? `?${qs}` : ''}`;
  }

  async get<T>(
    endpoint: string,
    queryPayload: ListQueryPayload = {},
    fetchParams: RequestInit = {}
  ): Promise<GetListResponse<T>> {
    const res = await fetch(
      this.getEndpointWithQuery(endpoint, queryPayload),
      fetchParams
    );
    return res.json();
  }

  constructor() {
    super(inject(BA_APP_CONFIG));
  }
}
