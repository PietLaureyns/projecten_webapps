import { TestBed, inject } from '@angular/core/testing';

import { KenniscentrumService } from './kenniscentrum.service';

describe('KenniscentrumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KenniscentrumService]
    });
  });

  it('should be created', inject([KenniscentrumService], (service: KenniscentrumService) => {
    expect(service).toBeTruthy();
  }));
});
