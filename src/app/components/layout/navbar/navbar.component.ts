import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../lib/button/button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { TripsService } from '../../../services/TripsService/trips.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'ba-navbar',
  imports: [
    NgOptimizedImage,
    ButtonComponent,
    FontAwesomeModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  tripsService = inject(TripsService);
  router = inject(Router);
  logoUrl = 'https://bizaway.com/wp-content/uploads/2021/09/Logo-Bizaway.svg';
  tripOfTheDayIcon = faWandMagicSparkles;
  isLoadingToD = signal(false);

  async onTripOfTheDayClick() {
    try {
      this.isLoadingToD.set(true);
      await this.tripsService.loadTripOfTheDay();

      const loadedTrip = this.tripsService.detail.data();

      if (loadedTrip) {
        this.router.navigate(['/trip', loadedTrip.id]);
      }
    } finally {
      this.isLoadingToD.set(false);
    }
  }
}
