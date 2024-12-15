import { TestBed } from '@angular/core/testing';
import { GetListService } from './getlist.service';

describe('ResourceListServiceService', () => {
  let service: GetListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
