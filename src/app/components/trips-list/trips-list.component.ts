import { Component } from '@angular/core';
import { ButtonComponent } from '../lib/button/button.component';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { TripsService } from '../../services/TripsService/trips.service';

@Component({
  selector: 'ba-trips-list',
  imports: [ButtonComponent],
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.css',
})
export class TripsListComponent {
  coffeeIcon = faCoffee;

  constructor(public tripsService: TripsService) {
    tripsService.list
      .load('trips', { pagination: { limit: 50, page: 1 } })
      .then((r) => console.log('aaaaaaaaaaaaaa', r));
  }
}
