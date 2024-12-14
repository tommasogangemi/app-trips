import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaNavbarComponent } from './navbar.component';

describe('BaNavbarComponent', () => {
  let component: BaNavbarComponent;
  let fixture: ComponentFixture<BaNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
