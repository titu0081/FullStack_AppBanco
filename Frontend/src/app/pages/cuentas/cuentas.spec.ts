import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { Cuentas } from './cuentas';
import { CuentasService } from '../../services/cuentas.servicio';

describe('Cuentas', () => {
  let component: Cuentas;
  let fixture: ComponentFixture<Cuentas>;

  const cuentasServiceMock = {
    get: jest.fn().mockReturnValue(of([])),
    delete: jest.fn().mockReturnValue(of(void 0)),
  };

  const routerMock = {
    navigateByUrl: jest.fn(),
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cuentas],
      providers: [
        { provide: CuentasService, useValue: cuentasServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Cuentas);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
