import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { TripsListComponent } from './trips-list.component';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';
import { TripsService } from '../../../services/TripsService/trips.service';
import { buildTripResponseMock } from '../../../utils/testing/trips';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { CircularLoaderComponent } from '../../lib/circular-loader/circular-loader.component';
import { ApiService } from '../../../services/lib/ApiService/api.service';

describe('TripsListComponent', () => {
  let component: TripsListComponent;
  let fixture: ComponentFixture<TripsListComponent>;
  let tripsService: TripsService;
  let apiService: ApiService;

  const setupComponent = () => {
    fixture = TestBed.createComponent(TripsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [TripsListComponent, RouterModule.forRoot([])],
      providers: ROOT_TESTING_PROVIDERS,
    }).compileComponents();

    tripsService = TestBed.inject(TripsService);
    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    setupComponent();
    expect(component).toBeTruthy();
  });

  describe('API interactions on landing', () => {
    it('should fetch the trips list with the default pagination and no sorting when initialized for the first time', () => {
      const loadSpy = spyOn(tripsService.list, 'load');

      setupComponent();

      const defaultPagination = component.INITIAL_PAGINATION;

      expect(loadSpy).toHaveBeenCalledOnceWith({
        sort: undefined,
        pagination: defaultPagination,
      });
    });

    it('should fetch the trips list with the default pagination and with sorting from the localStorage when initialized and there is some sorting stored', () => {
      localStorage.setItem(
        'trips-list__list-sort',
        JSON.stringify({ field: 'name', order: 'ASC' })
      );

      const loadSpy = spyOn(tripsService.list, 'load');

      setupComponent();

      const defaultPagination = component.INITIAL_PAGINATION;

      expect(loadSpy).toHaveBeenCalledOnceWith({
        sort: { field: 'name', order: 'ASC' },
        pagination: defaultPagination,
      });
    });
  });

  describe('rendering the content of the list', () => {
    it('should render a circular progress while the list is fetching upon landing', () => {
      spyOn(apiService, 'getList');

      setupComponent();

      tripsService.list.loading.set(true);

      const progress = fixture.debugElement.query(
        By.directive(CircularLoaderComponent)
      );
      expect(progress).toBeTruthy();
    });

    it('should render a number of cards equal to the number of trips in the list', fakeAsync(() => {
      spyOn(apiService, 'getList').and.returnValue(
        Promise.resolve({
          items: [
            buildTripResponseMock({ id: '1', title: 'Trip 1' }),
            buildTripResponseMock({ id: '2', title: 'Trip 2' }),
            buildTripResponseMock({ id: '3', title: 'Trip 3' }),
          ],
          limit: 20,
          page: 1,
          total: 3,
        })
      );

      setupComponent();

      tick();

      fixture.detectChanges();

      const cards = fixture.debugElement.queryAll(
        By.directive(TripCardComponent)
      );
      expect(cards.length).toBe(3);
    }));

    fit('should render the button to load more trips if there are more trips to load', fakeAsync(() => {
      spyOn(apiService, 'getList').and.returnValue(
        Promise.resolve({
          items: [
            buildTripResponseMock({ id: '1', title: 'Trip 1' }),
            buildTripResponseMock({ id: '2', title: 'Trip 2' }),
            buildTripResponseMock({ id: '3', title: 'Trip 3' }),
          ],
          limit: 20,
          page: 1,
          total: 5,
        })
      );

      setupComponent();

      tick();

      fixture.detectChanges();

      const loadMoreButton = fixture.debugElement.query(
        By.css('[data-testid="load-more-trips__button"]')
      );

      expect(loadMoreButton).toBeTruthy();
    }));
  });
});
