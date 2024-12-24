import { Component, input } from '@angular/core';
import { Trip } from '../../../../types/trips';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../lib/button/button.component';
import { faArrowLeft, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'ba-trip-detail-content',
  imports: [NgOptimizedImage, ButtonComponent, FontAwesomeModule],
  templateUrl: './trip-detail-content.component.html',
  styleUrl: './trip-detail-content.component.css',
})
export class TripDetailContentComponent {
  trip = input.required<Trip>();
  backArrowIcon = faArrowLeft;
  shareIcon = faShareNodes;
}
