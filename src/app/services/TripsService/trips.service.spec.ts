import { TestBed } from '@angular/core/testing';
import { TripsService } from './trips.service';
import { ROOT_TESTING_PROVIDERS } from '../../utils/testing';

describe('TripsService', () => {
  let service: TripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: ROOT_TESTING_PROVIDERS,
    });
    service = TestBed.inject(TripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
