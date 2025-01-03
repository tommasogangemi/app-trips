import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsPageComponent } from './trips-page.component';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';
import { By } from '@angular/platform-browser';

describe('TripsListComponent', () => {
  let component: TripsPageComponent;
  let fixture: ComponentFixture<TripsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripsPageComponent],
      providers: ROOT_TESTING_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(TripsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // This should be the only needed test here since all the functionality of the trips list is tested in the ba-trips-list component itself
  it('should render the trips list component', () => {
    const tripsList = fixture.debugElement.query(By.css('ba-trips-list'));

    expect(tripsList).toBeTruthy();
  });
});
