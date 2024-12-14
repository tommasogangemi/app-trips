import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaTripsListComponent } from './trips-list.component';

describe('BaTripsListComponent', () => {
  let component: BaTripsListComponent;
  let fixture: ComponentFixture<BaTripsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaTripsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaTripsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
