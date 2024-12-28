import { computed, signal } from '@angular/core';
import { ApiService } from '../ApiService/api.service';
import { ListPaginationPayload, ListQueryPayload } from '../../../../types/api';
import { TransformFn } from '../../../../types/common/functions';

interface ResourceListLoadConfig {
  /**
   * Whether to keep the existing data when loading new data and concatenate the nes data to the existing one.
   */
  keepData?: boolean;
}

/**
 * Handles fetching and managing a the state relative to a list of resources.
 */
export class ResourceListService<TResponse, TModel> {
  data = signal<TModel[]>([]);
  loading = signal<boolean>(false);
  error = signal<Error | undefined>(undefined);
  totalCount = signal<number>(0);
  pagination = signal<ListPaginationPayload>({ page: 1, limit: 20 });
  hasNextPage = computed<boolean>(() => this.data().length < this.totalCount());

  private updatePaginationState(updatedPagination: ListPaginationPayload) {
    this.pagination.set({ ...updatedPagination });
  }

  async load(
    queryPayload?: ListQueryPayload,
    config: ResourceListLoadConfig = {},
    fetchParams?: RequestInit
  ) {
    this.loading.set(true);
    this.error.set(undefined);

    try {
      const response = await this.apiService.getList<TResponse>(
        this.endpoint,
        queryPayload,
        fetchParams
      );

      const transformedItems = response.items.map(this.fromResponse);

      if (config.keepData) {
        this.data.update((prevData) => [...prevData, ...transformedItems]);
      } else {
        this.data.set(transformedItems);
      }

      this.totalCount.set(response.total);
      this.updatePaginationState({
        page: response.page,
        limit: response.limit,
      });
    } catch (error) {
      this.error.set(error as Error);
    } finally {
      this.loading.set(false);
    }
  }

  loadNextPage(
    queryPayload?: Omit<ListQueryPayload, 'pagination'>,
    fetchParams?: RequestInit
  ) {
    return this.load(
      {
        ...queryPayload,
        pagination: {
          page: this.pagination().page + 1,
          limit: this.pagination().limit,
        },
      },
      { keepData: true },
      fetchParams
    );
  }

  constructor(
    private apiService: ApiService,
    private endpoint: string,
    private fromResponse: TransformFn<TResponse, TModel>
  ) {}
}
