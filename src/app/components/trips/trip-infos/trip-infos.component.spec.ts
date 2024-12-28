import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripInfosComponent } from './trip-infos.component';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';
import { Trip } from '../../../resources/trips';

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
