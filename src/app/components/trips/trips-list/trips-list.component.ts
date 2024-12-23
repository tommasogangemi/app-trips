import { Component } from '@angular/core';
import { ButtonComponent } from '../../lib/button/button.component';
import { CircularLoaderComponent } from '../../lib/circular-loader/circular-loader.component';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripsService } from '../../../services/TripsService/trips.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'ba-trips-list',
  imports: [
    TripCardComponent,
    CircularLoaderComponent,
    ButtonComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.css',
})
export class TripsListComponent {
  constructor(public tripsService: TripsService) {}
}
