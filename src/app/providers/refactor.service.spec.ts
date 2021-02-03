import { TestBed } from '@angular/core/testing';

import { RefactorService } from './refactor.service';

describe('RefactorService', () => {
  let service: RefactorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefactorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
