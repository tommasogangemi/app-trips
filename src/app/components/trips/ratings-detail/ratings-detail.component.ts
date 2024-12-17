import { NgStyle } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface RatedItem {
  rating: number;
  nrOfRatings: number;
}

@Component({
  selector: 'ba-ratings-detail',
  imports: [FontAwesomeModule, NgStyle],
  templateUrl: './ratings-detail.component.html',
  styleUrl: './ratings-detail.component.css',
})
export class RatingsDetailComponent {
  ratedItem = input.required<RatedItem>();
  maxRating = input<number>(5);

  starIcon = faStar;

  maxStars = computed(() =>
    Array.from({ length: this.maxRating() }, (_, i) => i + 1)
  );
  ratingPercentage = computed(
    () => (this.ratedItem().rating / this.maxRating()) * 100
  );
  filledStarsStyle = computed(() => ({
    maxWidth: `${this.ratingPercentage()}%`,
  }));
}
