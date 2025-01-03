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
import { Router, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { CircularLoaderComponent } from '../../lib/circular-loader/circular-loader.component';
import { ApiService } from '../../../services/lib/ApiService/api.service';
import { TripDetailPageComponent } from '../trip-detail-page/trip-detail-page.component';

describe('TripsListComponent', () => {
  let component: TripsListComponent;
  let fixture: ComponentFixture<TripsListComponent>;
  let tripsService: TripsService;
  let apiService: ApiService;
  let router: Router;

  const setupComponent = () => {
    fixture = TestBed.createComponent(TripsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [
        TripsListComponent,
        RouterModule.forRoot([
          {
            path: 'trip/:id',
            component: TripDetailPageComponent,
          },
        ]),
      ],
      providers: ROOT_TESTING_PROVIDERS,
    }).compileComponents();

    tripsService = TestBed.inject(TripsService);
    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
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

    it('should render the button to load more trips if there are more trips to load', fakeAsync(() => {
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

  describe('user interactions', () => {
    it('should fetch the next page of trips when the user clicks on the load more button and display the number of cards according to the results', fakeAsync(() => {
      const getListSpy = spyOn(apiService, 'getList').and.returnValue(
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
      const loadNextPageSpy = spyOn(
        tripsService.list,
        'loadNextPage'
      ).and.callThrough();

      setupComponent();

      tick();
      fixture.detectChanges();

      expect(getListSpy).toHaveBeenCalledWith(
        'trips',
        {
          sort: undefined,
          pagination: { page: 1, limit: 20 },
        },
        undefined
      );
      expect(
        fixture.debugElement.queryAll(By.directive(TripCardComponent)).length
      ).toBe(3);

      getListSpy.and.returnValue(
        Promise.resolve({
          items: [
            buildTripResponseMock({ id: '4', title: 'Trip 4' }),
            buildTripResponseMock({ id: '5', title: 'Trip 5' }),
          ],
          limit: 20,
          page: 2,
          total: 5,
        })
      );

      const loadMoreButton = fixture.debugElement.query(
        By.css('[data-testid="load-more-trips__button"]')
      );

      loadMoreButton.nativeElement.click();

      tick();
      fixture.detectChanges();

      expect(loadNextPageSpy).toHaveBeenCalledOnceWith({
        sort: undefined,
      });
      expect(getListSpy).toHaveBeenCalledTimes(2);
      expect(getListSpy).toHaveBeenCalledWith(
        'trips',
        {
          sort: undefined,
          pagination: { page: 2, limit: 20 },
        },
        undefined
      );
      expect(
        fixture.debugElement.queryAll(By.directive(TripCardComponent)).length
      ).toBe(5);
    }));

    it('should fetch the trips list with the selected sorting when the user changes the sorting', fakeAsync(() => {
      const loadSpy = spyOn(tripsService.list, 'load');

      setupComponent();

      tick();
      fixture.detectChanges();

      const select = fixture.debugElement.query(By.css('select'));
      select.triggerEventHandler('change', {
        target: { value: '{"field":"title","order":"ASC"}' },
      });

      tick();
      fixture.detectChanges();

      expect(loadSpy).toHaveBeenCalledWith({
        sort: { field: 'title', order: 'ASC' },
        pagination: component.INITIAL_PAGINATION,
      });
    }));

    it('should call the load method with the default sorting when the user resets the sorting', fakeAsync(() => {
      const loadSpy = spyOn(tripsService.list, 'load');

      setupComponent();

      tick();
      fixture.detectChanges();

      const select = fixture.debugElement.query(By.css('select'));
      select.triggerEventHandler('change', {
        target: { value: '' },
      });

      tick();
      fixture.detectChanges();

      expect(loadSpy).toHaveBeenCalledWith({
        sort: undefined,
        pagination: component.INITIAL_PAGINATION,
      });
    }));

    it('should call always the load method with the default pagination when the user applies some sorting', fakeAsync(() => {
      const getListSpy = spyOn(apiService, 'getList').and.returnValue(
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

      getListSpy.and.returnValue(
        Promise.resolve({
          items: [
            buildTripResponseMock({ id: '4', title: 'Trip 4' }),
            buildTripResponseMock({ id: '5', title: 'Trip 5' }),
          ],
          limit: 20,
          page: 2,
          total: 5,
        })
      );

      const loadMoreButton = fixture.debugElement.query(
        By.css('[data-testid="load-more-trips__button"]')
      );

      loadMoreButton.nativeElement.click();

      tick();
      fixture.detectChanges();

      const select = fixture.debugElement.query(By.css('select'));
      select.triggerEventHandler('change', {
        target: { value: '{"field":"title","order":"ASC"}' },
      });

      tick();
      fixture.detectChanges();

      expect(getListSpy).toHaveBeenCalledTimes(3);
      expect(getListSpy.calls.allArgs()).toEqual([
        [
          'trips',
          { pagination: { page: 1, limit: 20 }, sort: undefined },
          undefined,
        ],
        [
          'trips',
          { pagination: { page: 2, limit: 20 }, sort: undefined },
          undefined,
        ],
        [
          'trips',
          {
            sort: { field: 'title', order: 'ASC' },
            pagination: { page: 1, limit: 20 },
          },
          undefined,
        ],
      ]);
    }));

    it('should navigate to the trip detail page for the given trip when clicking on a trip card', fakeAsync(() => {
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

      const tripCardWrapper = fixture.debugElement.query(
        By.css('[data-testid="trip-card__wrapper-link"]')
      );
      tripCardWrapper.nativeElement.click();

      tick();

      expect(router.url).toBe('/trip/1');
    }));
  });
});
