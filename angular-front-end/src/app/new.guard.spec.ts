import { TestBed } from '@angular/core/testing';

import { NewGuard } from './new.guard';

describe('NewGuard', () => {
  let guard: NewGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NewGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
