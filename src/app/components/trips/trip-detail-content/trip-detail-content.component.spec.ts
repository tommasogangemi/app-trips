import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailContentComponent } from './trip-detail-content.component';

describe('TripDetailContentComponent', () => {
  let component: TripDetailContentComponent;
  let fixture: ComponentFixture<TripDetailContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripDetailContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
