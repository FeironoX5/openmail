import { TestBed } from '@angular/core/testing';

import { PulseService } from './pulse.service';

describe('PulseService', () => {
  let service: PulseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PulseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
