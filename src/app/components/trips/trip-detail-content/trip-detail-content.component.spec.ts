import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripDetailContentComponent } from './trip-detail-content.component';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';
import { Trip } from '../../../resources/trips/trips';

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

    const trip = new Trip({
      id: '1',
      title: 'Test Trip',
      description: 'Test Description',
      price: 100,
      rating: 4,
      nrOfRatings: 10,
      verticalType: 'car',
      tags: ['tag1', 'tag2'],
      co2: 100,
      thumbnailUrl: 'test.jpg',
      imageUrl: 'test.jpg',
      creationDate: '2021-01-01',
    });

    fixture.componentRef.setInput('trip', trip);

    fixture.detectChanges();

    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
