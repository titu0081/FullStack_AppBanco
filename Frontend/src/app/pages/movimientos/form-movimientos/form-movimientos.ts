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
import { Cliente, Movimiento } from '../../../model/interfaces.models';
import { ClientesService } from '../../../services/clientes.servicio';
import { MovimientosService } from '../../../services/movimientos.servicio';

@Component({
  selector: 'app-form-movimientos',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form-movimientos.html',
  styleUrl: './form-movimientos.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormMovimientos implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly movimientosService = inject(MovimientosService);
  private readonly clientesService = inject(ClientesService);

  readonly clientes = signal<Cliente[]>([]);
  readonly cargando = signal<boolean>(false);
  readonly guardando = signal<boolean>(false);
  readonly esEdicion = signal<boolean>(false);

  readonly tituloFormulario = computed(() =>
    this.esEdicion() ? 'Editar movimiento' : 'Crear movimiento',
  );

  readonly form = this.fb.nonNullable.group({
    idPersona: [0, [Validators.required, Validators.min(1)]],
    tipoMovimiento: ['CREDITO', [Validators.required]],
    valor: [0, [Validators.required, Validators.min(0.01)]],
  });

  private idMovimiento: number | null = null;

  ngOnInit(): void {
    this.cargarClientes();

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isNaN(id) && id > 0) {
      this.idMovimiento = id;
      this.esEdicion.set(true);
      this.cargarMovimiento(id);
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando.set(true);
    const formValue = this.form.getRawValue();

    const payload = {
      tipoMovimiento: formValue.tipoMovimiento,
      valor: formValue.valor,
      cuenta: {
        cliente: {
          idPersona: formValue.idPersona,
        },
      },
    } as Movimiento;

    const request$ =
      this.esEdicion() && this.idMovimiento
        ? this.movimientosService.put(this.idMovimiento, {
            ...payload,
            idMovimiento: this.idMovimiento,
          })
        : this.movimientosService.post(payload);

    request$.subscribe({
      next: () => {
        this.guardando.set(false);
        this.router.navigateByUrl('/movimientos');
      },
      error: () => {
        this.guardando.set(false);
      },
    });
  }

  private cargarClientes(): void {
    this.cargando.set(true);
    this.clientesService.get().subscribe({
      next: (data) => {
        this.clientes.set(data ?? []);
        this.cargando.set(false);
      },
      error: () => {
        this.clientes.set([]);
        this.cargando.set(false);
      },
    });
  }

  private cargarMovimiento(id: number): void {
    this.cargando.set(true);
    this.movimientosService.getByID(id).subscribe({
      next: (movimiento) => {
        this.form.patchValue({
          idPersona: Number(movimiento.cuenta?.cliente?.idPersona ?? 0),
          tipoMovimiento: movimiento.tipoMovimiento,
          valor: Number(movimiento.valor),
        });
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
      },
    });
  }
}
