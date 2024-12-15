import { BaAppConfig } from '../../config/ba-app';

/**
 * Base class for all API fetch services.
 * Handles injection of the root endpoint from the app config.
 */
export abstract class FetchServiceBase {
  private rootEndpoint: string;

  /**
   * Takes the relative endpoint path and returns the full endpoint
   *
   * @param endpoint relative endpoint path
   * @returns
   */
  protected getEndpointWithRoot(endpoint: string): string {
    return `${this.rootEndpoint}${endpoint}`;
  }

  constructor(appConfig: BaAppConfig) {
    this.rootEndpoint = appConfig.endpointRoot;
  }
}
