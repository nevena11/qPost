import { TestBed } from '@angular/core/testing';

import { QPostService } from './q-post.service';

describe('QPostService', () => {
  let service: QPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
