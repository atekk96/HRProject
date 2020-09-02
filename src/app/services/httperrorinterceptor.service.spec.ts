import { TestBed } from '@angular/core/testing';

import { HttperrorinterceptorService } from './httperrorinterceptor.service';

describe('HttperrorinterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttperrorinterceptorService = TestBed.get(HttperrorinterceptorService);
    expect(service).toBeTruthy();
  });
});
