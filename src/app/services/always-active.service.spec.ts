import { TestBed, inject } from '@angular/core/testing';

import { AlwaysActiveService } from './always-active.service';

describe('AlwaysActiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlwaysActiveService]
    });
  });

  it('should be created', inject([AlwaysActiveService], (service: AlwaysActiveService) => {
    expect(service).toBeTruthy();
  }));
});
