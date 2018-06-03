import { TestBed, inject } from '@angular/core/testing';

import { BaseInfoService } from './base-info.service';

describe('BaseInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseInfoService]
    });
  });

  it('should be created', inject([BaseInfoService], (service: BaseInfoService) => {
    expect(service).toBeTruthy();
  }));
});
