import { TestBed } from '@angular/core/testing';

import { TichetService } from './tichet.service';

describe('TichetService', () => {
  let service: TichetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TichetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
