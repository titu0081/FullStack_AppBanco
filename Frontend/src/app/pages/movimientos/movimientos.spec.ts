import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { Movimientos } from './movimientos';
import { MovimientosService } from '../../services/movimientos.servicio';

describe('Movimientos', () => {
  let component: Movimientos;
  let fixture: ComponentFixture<Movimientos>;

  const movimientosServiceMock = {
    get: jest.fn().mockReturnValue(of([])),
    delete: jest.fn().mockReturnValue(of(void 0)),
  };

  const routerMock = {
    navigateByUrl: jest.fn(),
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Movimientos],
      providers: [
        { provide: MovimientosService, useValue: movimientosServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Movimientos);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
