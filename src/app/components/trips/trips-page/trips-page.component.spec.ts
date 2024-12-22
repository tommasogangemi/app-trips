import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsPageComponent } from './trips-page.component';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';

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
});
