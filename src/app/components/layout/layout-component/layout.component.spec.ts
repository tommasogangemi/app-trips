import { TestBed } from '@angular/core/testing';
import { AppComponent } from './layout.component';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: ROOT_TESTING_PROVIDERS,
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
