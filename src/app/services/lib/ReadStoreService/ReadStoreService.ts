import { TransformFn } from '../../../../types/common/functions';
import { WithId } from '../../../../types/common/object';
import { ResourceDetailService } from '../ResourceDetailService/resource-detail.service';
import { ResourceListService } from '../ResourceListService/resource-list.service';

/**
 * Class defining the skeleton of a service handling the application state for a resource with only read access to the API
 *
 * It exposes access to the list and detail services for the resource and requires basic configuration for API interactions related to read methods.
 */
export abstract class ReadStoreService<
  TResponse extends WithId,
  TModel extends WithId
> {
  /**
   * The relative endpoint for the resource
   */
  protected abstract endpoint: string;
  /**
   * Transform function to instantiate the model from the API response
   */
  protected abstract fromResponse: TransformFn<TResponse, TModel>;
  /**
   * The {@link ResourceListService} for the resource
   */
  abstract list: ResourceListService<TResponse, TModel>;
  /**
   * The {@link ResourceDetailService} for the resource
   */
  abstract detail: ResourceDetailService<TResponse, TModel>;
}
