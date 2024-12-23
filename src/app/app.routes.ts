import { Routes } from '@angular/router';
import { TripsPageComponent } from './components/trips/trips-page/trips-page.component';
import { TripDetailPageComponent } from './components/trips/trip-detail-page/trip-detail-page.component';

export const routes: Routes = [
  { path: '', component: TripsPageComponent },
  {
    path: 'trip/:id',
    component: TripDetailPageComponent,
  },
];
