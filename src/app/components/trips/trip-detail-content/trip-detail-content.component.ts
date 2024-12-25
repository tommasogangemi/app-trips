import { Component, inject, input } from '@angular/core';
import { Trip } from '../../../../types/trips';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../lib/button/button.component';
import { faArrowLeft, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Location } from '@angular/common';

@Component({
  selector: 'ba-trip-detail-content',
  imports: [NgOptimizedImage, ButtonComponent, FontAwesomeModule, DatePipe],
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
      'The link to this page has been copied to the clipboard, you can now share it with your friends!'
    );
  }
}
