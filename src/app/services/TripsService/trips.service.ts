import { inject, Injectable } from '@angular/core';
import { Trip } from '../../../types/trips';
import { ResourceListService } from '../lib/ResourceListService/resource-list.service';
import { ApiService } from '../lib/ApiService/api.service';

@Injectable({ providedIn: 'root' })
export class TripsService {
  list = new ResourceListService<Trip>(inject(ApiService));
}
