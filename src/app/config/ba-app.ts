import { InjectionToken } from '@angular/core';

export interface BaAppConfig {
  endpointRoot: string;
}

export const BA_APP_CONFIG = new InjectionToken<BaAppConfig>('BaAppConfig');

export const BA_APP_CONFIG_VARIABLE: BaAppConfig = {
  // This should be declared in a .env file and change based on the deployed env,
  // but for the purpose of this test it only needs to be declared once
  endpointRoot:
    'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/',
};
