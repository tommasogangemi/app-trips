import { Injectable, signal } from '@angular/core';
import { ApiService } from '../ApiService/api.service';
import { ListQueryPayload } from '../../../../types/api';

@Injectable()
export class ResourceListService<T> {
  list = signal<T[]>([]);
  loading = signal<boolean>(false);
  error = signal<Error | undefined>(undefined);
  totalCount = signal<number>(0);
  page = signal<number>(1);

  async load(
    endpoint: string,
    queryPayload?: ListQueryPayload,
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
      this.list.set(response.items);
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
