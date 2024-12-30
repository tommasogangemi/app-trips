import { inject, Injectable } from '@angular/core';
import { ResourceListService } from '../lib/ResourceListService/resource-list.service';
import { ApiService } from '../lib/ApiService/api.service';
import { ResourceDetailService } from '../lib/ResourceDetailService/resource-detail.service';
import { Trip, TripResponse } from '../../resources/trips';
import { TransformFn } from '../../../types/common/functions';
import { ReadStoreService } from '../lib/ReadStoreService/ReadStoreService';
import { WithId } from '../../../types/common/object';
import { storedSignal } from '../../utils/signals';
import { isSameDay } from 'date-fns/isSameDay';

/**
 * The reference to the trip of a given day.
 */
interface ToDReference extends WithId {
  date: string;
}

const ToD_STORAGE_KEY = 'trip_of_the_day';

export const transformTripResponse: TransformFn<TripResponse, Trip> = (res) =>
  new Trip(res);

@Injectable({ providedIn: 'root' })
export class TripsService extends ReadStoreService<TripResponse, Trip> {
  protected endpoint = 'trips';
  protected todEndpoint = 'random/trip-of-the-day';
  protected fromResponse = transformTripResponse;
  private todReference = storedSignal<ToDReference>(ToD_STORAGE_KEY);

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

  /**
   * Checks if we have a stored trip of the day.
   *  - If there is one with todays date then it loads it.
   *  - Else it loads the random trip of the day and stores its reference so that it will stick for the day.
   */
  async loadTripOfTheDay(): Promise<void> {
    const todReference = this.todReference();

    if (todReference && isSameDay(todReference.date, new Date())) {
      return this.detail.load(todReference.id);
    }

    await this.detail.load(this.todEndpoint);

    const loadedTrip = this.detail.data();

    if (loadedTrip?.id) {
      this.todReference.set({
        id: loadedTrip.id,
        date: new Date().toISOString(),
      });
    }
  }
}
