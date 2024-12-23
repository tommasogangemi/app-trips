import { Component, effect, inject, input } from '@angular/core';
import { TripsService } from '../../../services/TripsService/trips.service';

@Component({
  selector: 'ba-trip-detail-page',
  imports: [],
  templateUrl: './trip-detail-page.component.html',
  styleUrl: './trip-detail-page.component.css',
})
export class TripDetailPageComponent {
  id = input<string>();
  tripsService = inject(TripsService);

  private tripIdEffect = effect(() => {
    const tripId = this.id();

    if (tripId) {
      this.tripsService.detail.load(tripId);
    }
  });
}
