import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TripsListComponent } from '../trips-list/trips-list.component';

@Component({
  selector: 'ba-trips-page',
  imports: [FontAwesomeModule, TripsListComponent],
  templateUrl: './trips-page.component.html',
  styleUrl: './trips-page.component.css',
})
export class TripsPageComponent {
  coffeeIcon = faCoffee;
}
