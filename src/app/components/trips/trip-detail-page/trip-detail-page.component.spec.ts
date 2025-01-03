import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { TripDetailPageComponent } from './trip-detail-page.component';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';
import { By } from '@angular/platform-browser';
import { CircularLoaderComponent } from '../../lib/circular-loader/circular-loader.component';
import { ApiService } from '../../../services/lib/ApiService/api.service';
import { TripDetailContentComponent } from '../trip-detail-content/trip-detail-content.component';
import { buildTripResponseMock } from '../../../utils/testing/trips';

describe('TripDetailPageComponent', () => {
  let component: TripDetailPageComponent;
  let fixture: ComponentFixture<TripDetailPageComponent>;
  let apiService: ApiService;

  const setupComponent = (setProps?: () => void) => {
    fixture = TestBed.createComponent(TripDetailPageComponent);
    component = fixture.componentInstance;

    setProps?.();

    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripDetailPageComponent],
      providers: ROOT_TESTING_PROVIDERS,
    }).compileComponents();

    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    setupComponent();
    expect(component).toBeTruthy();
  });

  it('should display the circular progress when loading the trip', fakeAsync(() => {
    const getOneSpy = spyOn(apiService, 'getOne').and.returnValue(
      new Promise((res) => res({}))
    );

    setupComponent(() => {
      fixture.componentRef.setInput('id', 'trip-id');
    });

    tick();

    const circularLoader = fixture.debugElement.query(
      By.directive(CircularLoaderComponent)
    );

    expect(getOneSpy).toHaveBeenCalledTimes(1);
    expect(circularLoader).toBeTruthy();
  }));

  it('should load the trip with the given id when mounted', fakeAsync(() => {
    const getOneSpy = spyOn(apiService, 'getOne').and.returnValue(
      Promise.resolve(buildTripResponseMock({ id: 'trip-id' }))
    );

    setupComponent(() => {
      fixture.componentRef.setInput('id', 'trip-id');
    });

    tick();

    expect(getOneSpy).toHaveBeenCalledWith('trips', 'trip-id', undefined);
  }));

  it('should display the trip detail content when the trip is loaded', fakeAsync(() => {
    spyOn(apiService, 'getOne').and.returnValue(
      Promise.resolve(buildTripResponseMock({ id: 'trip-id' }))
    );

    setupComponent(() => {
      fixture.componentRef.setInput('id', 'trip-id');
    });

    tick();
    fixture.detectChanges();

    const tripDetailContent = fixture.debugElement.query(
      By.directive(TripDetailContentComponent)
    );

    expect(tripDetailContent).toBeTruthy();
  }));
});
