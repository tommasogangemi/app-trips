import { Component, inject, input } from '@angular/core';
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
import { RatingsDetailComponent } from '../ratings-detail/ratings-detail.component';
import { TagsDetailComponent } from '../tags-detail/tags-detail.component';
import { BA_APP_CONFIG } from '../../../config/ba-app';

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
    TagsDetailComponent,
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
