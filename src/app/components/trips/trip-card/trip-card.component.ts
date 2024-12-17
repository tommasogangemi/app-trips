import { Component, input } from '@angular/core';
import { Trip } from '../../../../types/trips';
import {
  CurrencyPipe,
  DecimalPipe,
  NgOptimizedImage,
  TitleCasePipe,
} from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faTag } from '@fortawesome/free-solid-svg-icons';
import { IconHighlighterComponent } from '../../lib/icon-highlighter/icon-highlighter.component';
import { TooltipComponent } from '../../lib/tooltip/tooltip.component';

@Component({
  selector: 'ba-trip-card',
  imports: [
    NgOptimizedImage,
    FontAwesomeModule,
    TitleCasePipe,
    CurrencyPipe,
    DecimalPipe,
    IconHighlighterComponent,
    TooltipComponent,
  ],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css',
})
export class TripCardComponent {
  trip = input.required<Trip>();

  starIcon = faStar;
  tagIcon = faTag;
}
