import { Component } from '@angular/core';
import { ButtonComponent } from '../../lib/button/button.component';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TripsService } from '../../../services/TripsService/trips.service';
import { TripCardComponent } from '../trip-card/trip-card.component';

@Component({
  selector: 'ba-trips-list',
  imports: [ButtonComponent, TripCardComponent, FontAwesomeModule],
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.css',
})
export class TripsListComponent {
  coffeeIcon = faCoffee;

  constructor(public tripsService: TripsService) {
    tripsService.list
      .load('trips', { pagination: { limit: 50, page: 1 } })
      .then((r) => console.log('ba-trips-list tripsService.list', r));
  }
}
