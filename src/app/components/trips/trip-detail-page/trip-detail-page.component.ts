import { Component, effect, inject, input } from '@angular/core';
import { TripsService } from '../../../services/TripsService/trips.service';
import { CircularLoaderComponent } from '../../lib/circular-loader/circular-loader.component';
import { TripDetailContentComponent } from '../trip-detail-content/trip-detail-content.component';

@Component({
  selector: 'ba-trip-detail-page',
  imports: [CircularLoaderComponent, TripDetailContentComponent],
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
