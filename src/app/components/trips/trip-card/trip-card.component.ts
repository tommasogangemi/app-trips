import { Component, inject, input } from '@angular/core';
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
import { RatingsDetailComponent } from '../ratings-detail/ratings-detail.component';
import { BA_APP_CONFIG } from '../../../config/ba-app';
import { TagBadgeComponent } from '../../lib/tag-badge/tag-badge.component';
import { Trip } from '../../../resources/trips/trips';

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
    RatingsDetailComponent,
    TagBadgeComponent,
  ],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css',
})
export class TripCardComponent {
  verticalTypesConfig = inject(BA_APP_CONFIG).verticalTypes;
  trip = input.required<Trip>();

  starIcon = faStar;
  tagIcon = faTag;
}
