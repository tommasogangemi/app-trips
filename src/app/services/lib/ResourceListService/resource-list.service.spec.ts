import { TestBed } from '@angular/core/testing';
import { ResourceListService } from './resource-list.service';
import { ROOT_TESTING_PROVIDERS } from '../../../utils/testing';

describe('ResourceListService', () => {
  let service: ResourceListService<unknown>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...ROOT_TESTING_PROVIDERS, ResourceListService],
    });
    service = TestBed.inject(ResourceListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
