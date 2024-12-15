import { inject, Injectable } from '@angular/core';
import {
  APIQueryPayload,
  GetListResponse,
  ListQueryPayload,
} from '../../../../types/api';
import { BA_APP_CONFIG } from '../../../config/ba-app';

@Injectable({ providedIn: 'root' })
/**
 * Interface between the app and the API,
 * handles data transformation from App specific domain to HTTP domain.
 *
 * Can be extended to support more complex API interactions, such as POST, PUT, DELETE, etc.
 */
export class ApiService {
  private rootEndpoint = inject(BA_APP_CONFIG).endpointRoot;

  /**
   * Takes the relative endpoint path and returns the full endpoint
   *
   * @param endpoint relative endpoint path
   * @returns
   */
  protected getEndpointWithRoot(endpoint: string): string {
    return `${this.rootEndpoint}${endpoint}`;
  }

  /**
   * @param queryPayload query payload formatted as needed for the API
   * @returns the query string with the correct format for the API
   */
  private apiQueryPayloadToQs(queryPayload: APIQueryPayload): string {
    return Object.entries(queryPayload)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }

  /**
   * Transforms the App domain query payload to the API query string
   *
   * @param payload the App domain query payload
   * @returns the query string with the correct format for the API
   */
  private getQsFromQueryPayload(payload: ListQueryPayload = {}): string {
    const apiPayload: APIQueryPayload = {
      sortBy: payload.sort?.field,
      sortOrder: payload.sort?.order,
      page: payload.pagination?.page,
      limit: payload.pagination?.limit,
      ...payload.filter,
    };

    return this.apiQueryPayloadToQs(apiPayload);
  }

  /**
   * Appends the query string to the endpoint
   *
   * @param endpoint the relative endpoint of the needed resource
   * @param queryPayload the App domain query payload
   * @returns the endpoint with the correct query string compliant with the API
   */
  private getListEndpointWithQuery(
    endpoint: string,
    queryPayload: ListQueryPayload = {}
  ): string {
    const qs = this.getQsFromQueryPayload(queryPayload);
    return `${this.getEndpointWithRoot(endpoint)}${qs ? `?${qs}` : ''}`;
  }

  /**
   * @param endpoint the relative endpoint of the needed resource
   * @param id the id of the element to fetch
   * @returns the endpoint with the id appended
   */
  private getDetailEndpoint(endpoint: string, id: string): string {
    return `${this.getEndpointWithRoot(endpoint)}/${id}`;
  }

  async getList<T>(
    endpoint: string,
    queryPayload: ListQueryPayload = {},
    fetchParams: RequestInit = {}
  ): Promise<GetListResponse<T>> {
    const res = await fetch(
      this.getListEndpointWithQuery(endpoint, queryPayload),
      fetchParams
    );
    return res.json();
  }

  async getOne<T>(
    endpoint: string,
    id: string,
    fetchParams: RequestInit = {}
  ): Promise<T> {
    const res = await fetch(this.getDetailEndpoint(endpoint, id), fetchParams);
    return res.json();
  }
}
