export interface GetListResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ListPaginationPayload {
  page: number;
  limit: number;
}

export interface ListSortPayload {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface ListQueryPayload {
  sort?: ListSortPayload;
  filter?: Record<string, string>;
  pagination?: ListPaginationPayload;
}

export interface APIQueryPayload {
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;

  [key: string]: string | number | undefined;
}
