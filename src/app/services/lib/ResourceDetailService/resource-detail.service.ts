import { signal } from '@angular/core';
import { ApiService } from '../ApiService/api.service';

/**
 * Handles fetching and managing a the state related to the detail of a resource.
 */
export class ResourceDetailService<T> {
  data = signal<T | undefined>(undefined);
  loading = signal<boolean>(false);
  error = signal<Error | undefined>(undefined);

  async load(id: string, fetchParams?: RequestInit) {
    this.loading.set(true);
    this.error.set(undefined);

    try {
      const response = await this.apiService.getOne<T>(
        this.endpoint,
        id,
        fetchParams
      );
      this.data.set(response);
    } catch (error) {
      this.error.set(error as Error);
    } finally {
      this.loading.set(false);
    }
  }

  constructor(private apiService: ApiService, private endpoint: string) {}
}
