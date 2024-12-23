import { inject, Injectable } from '@angular/core';
import { Trip } from '../../../types/trips';
import { ResourceListService } from '../lib/ResourceListService/resource-list.service';
import { ApiService } from '../lib/ApiService/api.service';
import { ResourceDetailService } from '../lib/ResourceDetailService/resource-detail.service';

@Injectable({ providedIn: 'root' })
export class TripsService {
  private endpoint = 'trips';

  list = new ResourceListService<Trip>(inject(ApiService), this.endpoint);
  detail = new ResourceDetailService<Trip>(inject(ApiService), this.endpoint);
}
