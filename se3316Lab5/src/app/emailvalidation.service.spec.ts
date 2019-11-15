import { TestBed } from '@angular/core/testing';

import { EmailvalidationService } from './emailvalidation.service';

describe('EmailvalidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailvalidationService = TestBed.get(EmailvalidationService);
    expect(service).toBeTruthy();
  });
});
