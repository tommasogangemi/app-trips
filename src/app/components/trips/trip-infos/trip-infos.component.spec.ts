import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripInfosComponent } from './trip-infos.component';

describe('TripInfosComponent', () => {
  let component: TripInfosComponent;
  let fixture: ComponentFixture<TripInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
