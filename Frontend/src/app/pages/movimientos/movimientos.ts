import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Movimiento } from '../../model/interfaces.models';
import { MovimientosService } from '../../services/movimientos.servicio';

@Component({
  selector: 'app-movimientos',
  imports: [],
  templateUrl: './movimientos.html',
  styleUrl: './movimientos.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Movimientos implements OnInit {
  private readonly movimientosService = inject(MovimientosService);
  private readonly router = inject(Router);

  readonly movimientos = signal<Movimiento[]>([]);
  readonly movimientosSource = signal<Movimiento[]>([]);
  readonly cargando = signal<boolean>(false);

  ngOnInit(): void {
    this.cargarMovimientos();
  }

  cargarMovimientos(): void {
    this.cargando.set(true);
    this.movimientosService.get().subscribe({
      next: (data) => {
        const movimientos = data ?? [];
        this.movimientosSource.set(movimientos);
        this.movimientos.set(movimientos);
        this.cargando.set(false);
      },
      error: () => {
        this.movimientosSource.set([]);
        this.movimientos.set([]);
        this.cargando.set(false);
      },
    });
  }

  goFormMovimiento(): void {
    this.router.navigateByUrl('/movimientos/nuevo');
  }

  goEditMovimiento(movimiento: Movimiento): void {
    if (movimiento.idMovimiento == null) {
      return;
    }

    this.router.navigate(['/movimientos/editar', movimiento.idMovimiento]);
  }

  deleteMovimiento(movimiento: Movimiento): void {
    if (movimiento.idMovimiento == null) {
      return;
    }

    const confirmar = window.confirm(
      `Deseas eliminar el movimiento ${movimiento.idMovimiento}?`,
    );
    if (!confirmar) {
      return;
    }

    this.movimientosService.delete(movimiento.idMovimiento).subscribe({
      next: () => {
        const updated = this.movimientosSource().filter(
          (m) => m.idMovimiento !== movimiento.idMovimiento,
        );
        this.movimientosSource.set(updated);
        this.movimientos.set(updated);
      },
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim().toLowerCase();

    if (!query) {
      this.movimientos.set(this.movimientosSource());
      return;
    }

    const filtered = this.movimientosSource().filter((movimiento) => {
      const values = [
        movimiento.idMovimiento,
        movimiento.fecha,
        movimiento.tipoMovimiento,
        movimiento.valor,
        movimiento.saldo,
        movimiento.cuenta?.idCuenta,
        movimiento.cuenta?.numeroCuenta,
        movimiento.cuenta?.cliente?.idPersona,
      ];

      return values.some((value) =>
        String(value ?? '')
          .toLowerCase()
          .includes(query),
      );
    });

    this.movimientos.set(filtered);
  }
}
