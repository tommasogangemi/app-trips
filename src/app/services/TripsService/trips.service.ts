import { inject, Injectable } from '@angular/core';
import { ResourceListService } from '../lib/ResourceListService/resource-list.service';
import { ApiService } from '../lib/ApiService/api.service';
import { ResourceDetailService } from '../lib/ResourceDetailService/resource-detail.service';
import { transformTripResponse } from '../../resources/trips';

@Injectable({ providedIn: 'root' })
export class TripsService {
  private endpoint = 'trips';

  list = new ResourceListService(
    inject(ApiService),
    this.endpoint,
    transformTripResponse
  );
  detail = new ResourceDetailService(
    inject(ApiService),
    this.endpoint,
    transformTripResponse
  );
}
