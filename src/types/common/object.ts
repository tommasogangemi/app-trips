import { ListSortPayload } from '../api';

export interface WithId {
  id: string;
}

export interface SelectableOption {
  value: string;
  label: string;
}

export interface SelectableSortOption {
  value: ListSortPayload;
  label: string;
}
