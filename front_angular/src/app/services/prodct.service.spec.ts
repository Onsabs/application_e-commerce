import { TestBed } from '@angular/core/testing';

import { ProdctService } from './prodct.service';

describe('ProdctService', () => {
  let service: ProdctService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdctService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
