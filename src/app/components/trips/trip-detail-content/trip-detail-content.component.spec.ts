import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripDetailContentComponent } from './trip-detail-content.component';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';
import { Trip } from '../../../resources/trips/trips';
import { buildTripResponseMock } from '../../../utils/testing/trips';

describe('TripDetailContentComponent', () => {
  let component: TripDetailContentComponent;
  let fixture: ComponentFixture<TripDetailContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripDetailContentComponent],
      providers: ROOT_TESTING_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(TripDetailContentComponent);
    component = fixture.componentInstance;

    const trip = new Trip(buildTripResponseMock());

    fixture.componentRef.setInput('trip', trip);

    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
