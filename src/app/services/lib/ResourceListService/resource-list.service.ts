import { Injectable, signal } from '@angular/core';
import { ApiService } from '../ApiService/api.service';
import { ListQueryPayload } from '../../../../types/api';

interface ResourceListLoadConfig {
  /**
   * Whether to keep the existing data when loading new data and concatenate the nes data to the existing one.
   */
  keepData?: boolean;
}

@Injectable()
export class ResourceListService<T> {
  data = signal<T[]>([]);
  loading = signal<boolean>(false);
  error = signal<Error | undefined>(undefined);
  totalCount = signal<number>(0);
  page = signal<number>(1);

  async load(
    endpoint: string,
    queryPayload?: ListQueryPayload,
    config: ResourceListLoadConfig = {},
    fetchParams?: RequestInit
  ) {
    this.loading.set(true);
    this.error.set(undefined);

    try {
      const response = await this.apiService.getList<T>(
        endpoint,
        queryPayload,
        fetchParams
      );

      if (config.keepData) {
        this.data.update((prevData) => [...prevData, ...response.items]);
      } else {
        this.data.set(response.items);
      }
      this.totalCount.set(response.total);
      this.page.set(response.page);
    } catch (error) {
      this.error.set(error as Error);
    } finally {
      this.loading.set(false);
    }
  }

  constructor(private apiService: ApiService) {}
}
