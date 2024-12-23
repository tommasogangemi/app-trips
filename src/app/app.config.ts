import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { BA_APP_CONFIG, BA_APP_CONFIG_VARIABLE } from './config/ba-app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    { provide: BA_APP_CONFIG, useValue: BA_APP_CONFIG_VARIABLE },
  ],
};
