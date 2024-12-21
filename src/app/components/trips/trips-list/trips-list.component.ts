import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TripsService } from '../../../services/TripsService/trips.service';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { CircularLoaderComponent } from '../../lib/circular-loader/circular-loader.component';

@Component({
  selector: 'ba-trips-list',
  imports: [TripCardComponent, FontAwesomeModule, CircularLoaderComponent],
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.css',
})
export class TripsListComponent {
  coffeeIcon = faCoffee;

  constructor(public tripsService: TripsService) {
    tripsService.list.load('trips', { pagination: { limit: 20, page: 1 } });
  }
}
