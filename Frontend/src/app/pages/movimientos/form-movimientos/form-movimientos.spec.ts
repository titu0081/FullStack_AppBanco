import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { FormMovimientos } from './form-movimientos';
import { ClientesService } from '../../../services/clientes.servicio';
import { CuentasService } from '../../../services/cuentas.servicio';
import { MovimientosService } from '../../../services/movimientos.servicio';

describe('FormMovimientos', () => {
  let component: FormMovimientos;
  let fixture: ComponentFixture<FormMovimientos>;

  const movimientosServiceMock = {
    getByID: jest.fn(),
    post: jest.fn().mockReturnValue(of({})),
    put: jest.fn().mockReturnValue(of({})),
  };

  const clientesServiceMock = {
    get: jest.fn().mockReturnValue(of([])),
  };

  const cuentasServiceMock = {
    get: jest.fn().mockReturnValue(of([])),
  };

  const routerMock = {
    navigateByUrl: jest.fn(),
    navigate: jest.fn(),
    events: of(),
    createUrlTree: jest.fn().mockReturnValue({}),
    serializeUrl: jest.fn().mockReturnValue(''),
  };

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue(null),
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMovimientos],
      providers: [
        { provide: MovimientosService, useValue: movimientosServiceMock },
        { provide: ClientesService, useValue: clientesServiceMock },
        { provide: CuentasService, useValue: cuentasServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormMovimientos);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
