import { TestBed } from '@angular/core/testing';

import { StorageLiteService } from './storage-lite.service';

describe('StorageLiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageLiteService = TestBed.get(StorageLiteService);
    expect(service).toBeTruthy();
  });
});
