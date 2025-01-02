import { Component, inject, input } from '@angular/core';
import { RatingsDetailComponent } from '../ratings-detail/ratings-detail.component';
import { BA_APP_CONFIG } from '../../../config/ba-app';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { Trip } from '../../../resources/trips/trips';
import { TripScoreBadgeComponent } from '../trip-score-badge/trip-score-badge.component';

@Component({
  selector: 'ba-trip-infos',
  imports: [
    RatingsDetailComponent,
    FontAwesomeModule,
    DecimalPipe,
    TitleCasePipe,
    TripScoreBadgeComponent,
  ],
  templateUrl: './trip-infos.component.html',
  styleUrl: './trip-infos.component.css',
})
export class TripInfosComponent {
  verticalTypesConfig = inject(BA_APP_CONFIG).verticalTypes;
  trip = input.required<Trip>();
  co2Icon = faLeaf;
}
