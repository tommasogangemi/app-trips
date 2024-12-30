import { TestBed } from '@angular/core/testing';
import { ListViewService } from './list-view.service';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';

describe('ListViewService', () => {
  let service: ListViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: ROOT_TESTING_PROVIDERS,
    });
    service = TestBed.inject(ListViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
