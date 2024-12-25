import { Component, inject, input } from '@angular/core';
import { Trip } from '../../../../types/trips';
import { RatingsDetailComponent } from '../ratings-detail/ratings-detail.component';
import { BA_APP_CONFIG } from '../../../config/ba-app';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'ba-trip-infos',
  imports: [RatingsDetailComponent, FontAwesomeModule, DecimalPipe],
  templateUrl: './trip-infos.component.html',
  styleUrl: './trip-infos.component.css',
})
export class TripInfosComponent {
  verticalTypesConfig = inject(BA_APP_CONFIG).verticalTypes;
  trip = input.required<Trip>();
  co2Icon = faLeaf;
}
