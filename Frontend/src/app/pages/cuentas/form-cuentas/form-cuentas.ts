import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cuenta } from '../../../model/interfaces.models';
import { CuentasService } from '../../../services/cuentas.servicio';

@Component({
  selector: 'app-form-cuentas',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form-cuentas.html',
  styleUrl: './form-cuentas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCuentas implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cuentasService = inject(CuentasService);

  readonly cargando = signal<boolean>(false);
  readonly guardando = signal<boolean>(false);
  readonly esEdicion = signal<boolean>(false);

  readonly tituloFormulario = computed(() =>
    this.esEdicion() ? 'Editar cuenta' : 'Crear cuenta',
  );

  readonly form = this.fb.nonNullable.group({
    numeroCuenta: ['', [Validators.required, Validators.maxLength(20)]],
    tipoCuenta: ['', [Validators.required, Validators.maxLength(11)]],
    saldoInicial: [0, [Validators.required, Validators.min(0)]],
    estadoCuenta: [true, [Validators.required]],
    idPersona: [0, [Validators.required, Validators.min(1)]],
  });

  private idCuenta: number | null = null;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isNaN(id) && id > 0) {
      this.idCuenta = id;
      this.esEdicion.set(true);
      this.cargarCuenta(id);
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando.set(true);
    const formValue = this.form.getRawValue();

    const payload: Cuenta = {
      numeroCuenta: formValue.numeroCuenta,
      tipoCuenta: formValue.tipoCuenta,
      saldoInicial: formValue.saldoInicial,
      estadoCuenta: formValue.estadoCuenta,
      cliente: {
        idPersona: formValue.idPersona,
      } as Cuenta['cliente'],
      saldoActual: null,
    } as Cuenta;

    const request$ =
      this.esEdicion() && this.idCuenta
        ? this.cuentasService.put(this.idCuenta, {
            ...payload,
            idCuenta: this.idCuenta,
          })
        : this.cuentasService.post(payload);

    request$.subscribe({
      next: () => {
        this.guardando.set(false);
        this.router.navigateByUrl('/cuentas');
      },
      error: () => {
        this.guardando.set(false);
      },
    });
  }

  private cargarCuenta(id: number): void {
    this.cargando.set(true);
    this.cuentasService.getByID(id).subscribe({
      next: (cuenta) => {
        this.form.patchValue({
          numeroCuenta: cuenta.numeroCuenta,
          tipoCuenta: cuenta.tipoCuenta,
          saldoInicial: Number(cuenta.saldoInicial),
          estadoCuenta: Boolean(cuenta.estadoCuenta),
          idPersona: Number(cuenta.cliente?.idPersona ?? 0),
        });
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
      },
    });
  }
}
