import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../../lib/button/button.component';
import { buildTripResponseMock } from '../../../utils/testing/trips';
import { ApiService } from '../../../services/lib/ApiService/api.service';
import { Router, RouterModule } from '@angular/router';
import { TripDetailPageComponent } from '../../trips/trip-detail-page/trip-detail-page.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let apiService: ApiService;
  let router: Router;

  const setupComponent = () => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        RouterModule.forRoot([
          {
            path: 'trip/:id',
            component: TripDetailPageComponent,
          },
        ]),
      ],
      providers: ROOT_TESTING_PROVIDERS,
    }).compileComponents();

    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    setupComponent();
    expect(component).toBeTruthy();
  });

  describe('Trip of the day button', () => {
    it('should render the trip of the day button', () => {
      setupComponent();

      const todButton = fixture.debugElement.query(
        By.css('[data-testid="navbar__trip-of-the-day-button"]')
      );

      expect(todButton).toBeTruthy();
    });

    it('should fetch the trip of the day for the first time and then redirect to the trip detail page when clicked and there is no tod saved', fakeAsync(async () => {
      const todPromise = new Promise((resolve) => {
        resolve(buildTripResponseMock({ id: 'tod-id' }));
      });
      const getOneSpy = spyOn(apiService, 'getOne').and.returnValue(todPromise);

      setupComponent();

      const todButton = fixture.debugElement.query(
        By.css('[data-testid="navbar__trip-of-the-day-button"]')
      );

      todButton.nativeElement.click();

      fixture.detectChanges();

      expect(getOneSpy).toHaveBeenCalledWith(
        'trips',
        'random/trip-of-the-day',
        undefined
      );
      expect(
        (todButton.componentInstance as ButtonComponent).loading()
      ).toBeTrue();

      await todPromise;

      tick();
      fixture.detectChanges();

      expect(
        (todButton.componentInstance as ButtonComponent).loading()
      ).toBeFalse();
      expect(router.url).toBe('/trip/tod-id');
    }));

    it('should fetch the trip of the day referenced in the localstorage then redirect to the trip detail page when clicked and there is a tod saved', fakeAsync(async () => {
      localStorage.setItem(
        'tripOfTheDay',
        JSON.stringify({ id: 'tod-id', date: new Date().toISOString() })
      );
      const todPromise = new Promise((resolve) => {
        resolve(buildTripResponseMock({ id: 'tod-id' }));
      });
      const getOneSpy = spyOn(apiService, 'getOne').and.returnValue(todPromise);

      setupComponent();

      const todButton = fixture.debugElement.query(
        By.css('[data-testid="navbar__trip-of-the-day-button"]')
      );

      todButton.nativeElement.click();

      fixture.detectChanges();

      expect(getOneSpy).toHaveBeenCalledWith(
        'trips',
        'random/trip-of-the-day',
        undefined
      );
      expect(
        (todButton.componentInstance as ButtonComponent).loading()
      ).toBeTrue();

      await todPromise;

      tick();
      fixture.detectChanges();

      expect(
        (todButton.componentInstance as ButtonComponent).loading()
      ).toBeFalse();
      expect(router.url).toBe('/trip/tod-id');
    }));
  });
});
