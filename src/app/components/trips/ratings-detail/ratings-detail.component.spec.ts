import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingsDetailComponent } from './ratings-detail.component';

xdescribe('RatingsDetailComponent', () => {
  let component: RatingsDetailComponent;
  let fixture: ComponentFixture<RatingsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingsDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
