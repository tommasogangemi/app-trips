import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripDetailPageComponent } from './trip-detail-page.component';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';

describe('TripDetailPageComponent', () => {
  let component: TripDetailPageComponent;
  let fixture: ComponentFixture<TripDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripDetailPageComponent],
      providers: ROOT_TESTING_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(TripDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
