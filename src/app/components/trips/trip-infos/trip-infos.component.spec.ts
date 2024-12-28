import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripInfosComponent } from './trip-infos.component';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
