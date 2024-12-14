export interface GetListResponse<T> {
  items: T[];
  total: 1011;
  page: 1;
  limit: 100;
}

export interface ListQueryPayload {
  sort?: {
    field: string;
    order: 'ASC' | 'DESC';
  };
  filter?: Record<string, string>;
  pagination?: {
    page: number;
    limit: number;
  };
}

export interface APIQueryPayload {
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;

  [key: string]: string | number | undefined;
}
