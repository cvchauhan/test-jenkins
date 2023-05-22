import { TestBed } from '@angular/core/testing';

import { ServiceDesignService } from './service-design.service';

describe('ServiceDesignService', () => {
  let service: ServiceDesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
