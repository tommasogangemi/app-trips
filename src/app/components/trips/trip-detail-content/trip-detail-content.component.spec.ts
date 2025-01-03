import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripDetailContentComponent } from './trip-detail-content.component';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';
import { Trip } from '../../../resources/trips/trips';
import { buildTripResponseMock } from '../../../utils/testing/trips';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

describe('TripDetailContentComponent', () => {
  let component: TripDetailContentComponent;
  let fixture: ComponentFixture<TripDetailContentComponent>;
  let location: Location;

  const setupComponent = (setProps?: () => void) => {
    fixture = TestBed.createComponent(TripDetailContentComponent);
    component = fixture.componentInstance;

    setProps?.();

    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripDetailContentComponent],
      providers: ROOT_TESTING_PROVIDERS,
    }).compileComponents();

    location = TestBed.inject(Location);
  });

  it('should create', async () => {
    setupComponent(() => {
      fixture.componentRef.setInput('trip', new Trip(buildTripResponseMock()));
    });

    expect(component).toBeTruthy();
  });

  it('should redirect back when clicking on the back button', () => {
    setupComponent(() => {
      fixture.componentRef.setInput('trip', new Trip(buildTripResponseMock()));
    });

    const backSpy = spyOn(location, 'back');

    const backButton = fixture.debugElement.query(
      By.css('[data-testid="trip-detail-content__back-button"]')
    );

    backButton.triggerEventHandler('click', null);

    expect(backSpy).toHaveBeenCalled();
  });
});
