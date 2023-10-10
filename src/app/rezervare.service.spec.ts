import { TestBed } from '@angular/core/testing';

import { RezervareService } from './rezervare.service';

describe('RezervareService', () => {
  let service: RezervareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RezervareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
