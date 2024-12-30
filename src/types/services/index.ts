import { ResourceDetailService } from '../../app/services/lib/ResourceDetailService/resource-detail.service';
import { ResourceListService } from '../../app/services/lib/ResourceListService/resource-list.service';
import { TransformFn } from '../common/functions';
import { WithId } from '../common/object';

/**
 * Interface defining the skeleton of a service handling the application state for a resource with only read access to the API
 *
 * It exposes access to the list and detail services for the resource and requires basic configuration for API interactions related to read methods.
 */
export interface StoreReadService<
  TResponse extends WithId,
  TModel extends WithId
> {
  /**
   * The relative endpoint for the resource
   */
  endpoint: string;
  /**
   * Transform function to instantiate the model from the API response
   */
  fromResponse: TransformFn<TResponse, TModel>;
  /**
   * The {@link ResourceListService} for the resource
   */
  list: ResourceListService<TResponse, TModel>;
  /**
   * The {@link ResourceDetailService} for the resource
   */
  detail: ResourceDetailService<TResponse, TModel>;
}
