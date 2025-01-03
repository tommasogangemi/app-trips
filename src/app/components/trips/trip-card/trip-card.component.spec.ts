import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCardComponent } from './trip-card.component';
import { Trip } from '../../../resources/trips/trips';
import { buildTripResponseMock } from '../../../utils/testing/trips';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';

describe('TripCardComponent', () => {
  let component: TripCardComponent;
  let fixture: ComponentFixture<TripCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripCardComponent],
      providers: ROOT_TESTING_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(TripCardComponent);
    component = fixture.componentInstance;

    const trip = new Trip(buildTripResponseMock());

    fixture.componentRef.setInput('trip', trip);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
