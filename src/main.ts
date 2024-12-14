import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/components/layout/ba-layout/ba-layout.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
