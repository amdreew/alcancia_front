import { TestBed } from '@angular/core/testing';

import { PinggyBankService } from './pinggy-bank.service';

describe('PinggyBankService', () => {
  let service: PinggyBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinggyBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
