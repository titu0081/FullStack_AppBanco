import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { FormClientes } from './form-clientes';
import { ClientesService } from '../../../services/clientes.servicio';

describe('FormClientes', () => {
  let component: FormClientes;
  let fixture: ComponentFixture<FormClientes>;

  const clientesServiceMock = {
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
      imports: [FormClientes],
      providers: [
        { provide: ClientesService, useValue: clientesServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormClientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
