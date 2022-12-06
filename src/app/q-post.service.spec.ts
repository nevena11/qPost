import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { QPostService } from './q-post.service';

describe('QPostService', () => {
  let service: QPostService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]

    });
    service = TestBed.inject(QPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
