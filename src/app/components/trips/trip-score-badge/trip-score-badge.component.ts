import { Component, input } from '@angular/core';
import { TripScore } from '../../../resources/trips/trips';
import { TitleCasePipe } from '@angular/common';
import { TooltipComponent } from '../../lib/tooltip/tooltip.component';

@Component({
  selector: 'ba-trip-score-badge',
  imports: [TitleCasePipe, TooltipComponent],
  templateUrl: './trip-score-badge.component.html',
})
export class TripScoreBadgeComponent {
  score = input.required<TripScore>();
}
