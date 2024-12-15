import { ApplicationConfig } from '@angular/core';
import { ApiService } from '../services/lib/ApiService/api.service';
import { TripsService } from '../services/TripsService/trips.service';
import { BA_APP_CONFIG, BA_APP_CONFIG_VARIABLE } from '../config/ba-app';

export const ROOT_TESTING_PROVIDERS: ApplicationConfig['providers'] = [
  ApiService,
  TripsService,
  { provide: BA_APP_CONFIG, useValue: BA_APP_CONFIG_VARIABLE },
];
