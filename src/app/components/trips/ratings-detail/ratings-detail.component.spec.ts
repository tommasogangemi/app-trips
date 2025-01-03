import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingsDetailComponent } from './ratings-detail.component';

describe('RatingsDetailComponent', () => {
  let component: RatingsDetailComponent;
  let fixture: ComponentFixture<RatingsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingsDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingsDetailComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('ratedItem', { rating: 3, nrOfRatings: 10 });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
