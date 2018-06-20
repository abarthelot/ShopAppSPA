import { TestBed, inject } from '@angular/core/testing';

import { OnlyOwnerServiceService } from './only-owner-service.service';

describe('OnlyOwnerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyOwnerServiceService]
    });
  });

  it('should be created', inject([OnlyOwnerServiceService], (service: OnlyOwnerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
