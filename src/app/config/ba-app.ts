import { InjectionToken } from '@angular/core';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import {
  faCar,
  faHotel,
  faPlane,
  faTrain,
} from '@fortawesome/free-solid-svg-icons';

export interface BaAppConfig {
  endpointRoot: string;
  verticalTypes: Record<string, { icon: IconDefinition }>;
}

export const BA_APP_CONFIG = new InjectionToken<BaAppConfig>('BaAppConfig');

export const BA_APP_CONFIG_VARIABLE: BaAppConfig = {
  // This should be declared in a .env file and change based on the deployed env,
  // but for the purpose of this test it only needs to be declared once
  endpointRoot:
    'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/',
  // Ideally the available vertical types and their icons would be fetched from the API and not hardcoded here.
  verticalTypes: {
    car: { icon: faCar },
    flight: { icon: faPlane },
    hotel: { icon: faHotel },
    train: { icon: faTrain },
  },
};
