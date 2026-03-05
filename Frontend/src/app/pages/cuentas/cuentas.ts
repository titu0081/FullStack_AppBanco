import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Cuenta } from '../../model/interfaces.models';
import { CuentasService } from '../../services/cuentas.servicio';

@Component({
  selector: 'app-cuentas',
  imports: [],
  templateUrl: './cuentas.html',
  styleUrl: './cuentas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cuentas implements OnInit {
  private readonly cuentasService = inject(CuentasService);
  private readonly router = inject(Router);

  readonly cuentas = signal<Cuenta[]>([]);
  readonly cuentasSource = signal<Cuenta[]>([]);
  readonly cargando = signal<boolean>(false);

  ngOnInit(): void {
    this.cargarCuentas();
  }

  cargarCuentas(): void {
    this.cargando.set(true);
    this.cuentasService.get().subscribe({
      next: (data) => {
        const cuentas = data ?? [];
        this.cuentasSource.set(cuentas);
        this.cuentas.set(cuentas);
        this.cargando.set(false);
      },
      error: () => {
        this.cuentasSource.set([]);
        this.cuentas.set([]);
        this.cargando.set(false);
      },
    });
  }

  goFormCuenta(): void {
    this.router.navigateByUrl('/cuentas/nuevo');
  }

  goEditCuenta(cuenta: Cuenta): void {
    if (cuenta.idCuenta == null) {
      return;
    }

    this.router.navigate(['/cuentas/editar', cuenta.idCuenta]);
  }

  deleteCuenta(cuenta: Cuenta): void {
    if (cuenta.idCuenta == null) {
      return;
    }

    const confirmar = window.confirm(
      `Deseas eliminar la cuenta ${cuenta.numeroCuenta}?`,
    );
    if (!confirmar) {
      return;
    }

    this.cuentasService.delete(cuenta.idCuenta).subscribe({
      next: () => {
        const updated = this.cuentasSource().filter(
          (c) => c.idCuenta !== cuenta.idCuenta,
        );
        this.cuentasSource.set(updated);
        this.cuentas.set(updated);
      },
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim().toLowerCase();

    if (!query) {
      this.cuentas.set(this.cuentasSource());
      return;
    }

    const filtered = this.cuentasSource().filter((cuenta) => {
      const values = [
        cuenta.idCuenta,
        cuenta.numeroCuenta,
        cuenta.tipoCuenta,
        cuenta.saldoInicial,
        cuenta.saldoActual,
        cuenta.estadoCuenta ? 'activo' : 'inactivo',
        cuenta.cliente?.idPersona,
        cuenta.cliente?.nombre,
      ];

      return values.some((value) =>
        String(value ?? '')
          .toLowerCase()
          .includes(query),
      );
    });

    this.cuentas.set(filtered);
  }
}
