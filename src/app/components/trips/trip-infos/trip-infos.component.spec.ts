import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripInfosComponent } from './trip-infos.component';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';
import { Trip } from '../../../resources/trips/trips';
import { buildTripResponseMock } from '../../../utils/testing/trips';

describe('TripInfosComponent', () => {
  let component: TripInfosComponent;
  let fixture: ComponentFixture<TripInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripInfosComponent],
      providers: ROOT_TESTING_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(TripInfosComponent);
    component = fixture.componentInstance;

    const trip = new Trip(buildTripResponseMock());

    fixture.componentRef.setInput('trip', trip);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
