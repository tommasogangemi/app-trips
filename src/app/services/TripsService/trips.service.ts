import { inject, Injectable } from '@angular/core';
import { ResourceListService } from '../lib/ResourceListService/resource-list.service';
import { ApiService } from '../lib/ApiService/api.service';
import { ResourceDetailService } from '../lib/ResourceDetailService/resource-detail.service';
import { Trip, TripResponse } from '../../resources/trips';
import { TransformFn } from '../../../types/common/functions';
import { StoreReadService } from '../../../types/services';

export const transformTripResponse: TransformFn<TripResponse, Trip> = (res) =>
  new Trip(res);

@Injectable({ providedIn: 'root' })
export class TripsService implements StoreReadService<TripResponse, Trip> {
  endpoint = 'trips';
  fromResponse = transformTripResponse;

  list = new ResourceListService(
    inject(ApiService),
    this.endpoint,
    this.fromResponse
  );
  detail = new ResourceDetailService(
    inject(ApiService),
    this.endpoint,
    this.fromResponse
  );
}
