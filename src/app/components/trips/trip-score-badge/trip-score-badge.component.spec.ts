import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripScoreBadgeComponent } from './trip-score-badge.component';

describe('TripScoreBadgeComponent', () => {
  let component: TripScoreBadgeComponent;
  let fixture: ComponentFixture<TripScoreBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripScoreBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripScoreBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
