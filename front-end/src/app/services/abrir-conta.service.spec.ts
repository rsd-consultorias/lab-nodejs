import { TestBed } from '@angular/core/testing';

import { AbrirContaService } from './abrir-conta.service';

describe('AbrirContaService', () => {
  let service: AbrirContaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbrirContaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
