import { TestBed } from '@angular/core/testing';

import { BonService } from './bon.service';

describe('BonService', () => {
  let service: BonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
