import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { Clientes } from './clientes';
import { ClientesService } from '../../services/clientes.servicio';

describe('Clientes', () => {
  let component: Clientes;
  let fixture: ComponentFixture<Clientes>;

  const clientesServiceMock = {
    get: jest.fn().mockReturnValue(of([])),
    delete: jest.fn().mockReturnValue(of(void 0)),
  };

  const routerMock = {
    navigateByUrl: jest.fn(),
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Clientes],
      providers: [
        { provide: ClientesService, useValue: clientesServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Clientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
