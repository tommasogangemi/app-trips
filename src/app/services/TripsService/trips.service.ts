import { inject, Injectable } from '@angular/core';
import { ResourceListService } from '../lib/ResourceListService/resource-list.service';
import { ApiService } from '../lib/ApiService/api.service';
import { ResourceDetailService } from '../lib/ResourceDetailService/resource-detail.service';
import { Trip, TripResponse } from '../../resources/trips';
import { TransformFn } from '../../../types/common/functions';
import { ReadStoreService } from '../lib/ReadStoreService/ReadStoreService';

export const transformTripResponse: TransformFn<TripResponse, Trip> = (res) =>
  new Trip(res);

@Injectable({ providedIn: 'root' })
export class TripsService extends ReadStoreService<TripResponse, Trip> {
  protected endpoint = 'trips';
  protected fromResponse = transformTripResponse;

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
