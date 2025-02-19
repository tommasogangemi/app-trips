import { Component, inject, input } from '@angular/core';
import { CurrencyPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../lib/button/button.component';
import { faArrowLeft, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Location } from '@angular/common';
import { TripInfosComponent } from '../trip-infos/trip-infos.component';
import { TagBadgeComponent } from '../../lib/tag-badge/tag-badge.component';
import { Trip } from '../../../resources/trips/trips';

@Component({
  selector: 'ba-trip-detail-content',
  imports: [
    NgOptimizedImage,
    ButtonComponent,
    FontAwesomeModule,
    DatePipe,
    TripInfosComponent,
    TagBadgeComponent,
    CurrencyPipe,
  ],
  templateUrl: './trip-detail-content.component.html',
  styleUrl: './trip-detail-content.component.css',
})
export class TripDetailContentComponent {
  location = inject(Location);
  trip = input.required<Trip>();
  backArrowIcon = faArrowLeft;
  shareIcon = faShareNodes;

  onShareClick() {
    // TODO: implement more advanced share functionality and notification
    navigator.clipboard.writeText(location.href);

    alert(
      'The link to this page has been copied to the clipboard, you can now share it with your friends!\n\n(This is just a placeholder for the functionality, it should be implemented in a more user friendly way in the future)'
    );
  }
}
