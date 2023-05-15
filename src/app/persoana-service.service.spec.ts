import { TestBed } from '@angular/core/testing';

import { PersoanaServiceService } from './persoana-service.service';

describe('PersoanaServiceService', () => {
  let service: PersoanaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersoanaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
