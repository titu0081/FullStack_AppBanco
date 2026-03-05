import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { FormCuentas } from './form-cuentas';
import { CuentasService } from '../../../services/cuentas.servicio';

describe('FormCuentas', () => {
  let component: FormCuentas;
  let fixture: ComponentFixture<FormCuentas>;

  const cuentasServiceMock = {
    getByID: jest.fn(),
    post: jest.fn().mockReturnValue(of({})),
    put: jest.fn().mockReturnValue(of({})),
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
      imports: [FormCuentas],
      providers: [
        { provide: CuentasService, useValue: cuentasServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCuentas);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
