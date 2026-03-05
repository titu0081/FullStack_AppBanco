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
import { ClientesService } from '../../../services/clientes.servicio';
import { Cliente } from '../../../model/interfaces.models';

@Component({
  selector: 'app-form-clientes',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form-clientes.html',
  styleUrl: './form-clientes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormClientes implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly clientesService = inject(ClientesService);

  readonly cargando = signal<boolean>(false);
  readonly guardando = signal<boolean>(false);
  readonly esEdicion = signal<boolean>(false);

  readonly tituloFormulario = computed(() =>
    this.esEdicion() ? 'Editar cliente' : 'Crear cliente',
  );

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    identificacion: [0, [Validators.required, Validators.min(1)]],
    edad: [0, [Validators.required, Validators.min(1)]],
    genero: ['', [Validators.required, Validators.maxLength(20)]],
    direccion: ['', [Validators.required, Validators.maxLength(200)]],
    telefono: ['', [Validators.required, Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    estado: [true, [Validators.required]],
  });

  private idPersona: number | null = null;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isNaN(id) && id > 0) {
      this.idPersona = id;
      this.esEdicion.set(true);
      this.cargarCliente(id);
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando.set(true);
    const formValue = this.form.getRawValue();
    const request$ =
      this.esEdicion() && this.idPersona
        ? this.clientesService.put(this.idPersona, {
            idPersona: this.idPersona,
            ...formValue,
          } as Cliente)
        : this.clientesService.post(formValue as Cliente);

    request$.subscribe({
      next: () => {
        this.guardando.set(false);
        this.router.navigateByUrl('/clientes');
      },
      error: () => {
        this.guardando.set(false);
      },
    });
  }

  private cargarCliente(id: number): void {
    this.cargando.set(true);
    this.clientesService.getByID(id).subscribe({
      next: (cliente) => {
        this.form.patchValue({
          nombre: cliente.nombre,
          identificacion: cliente.identificacion,
          edad: cliente.edad,
          genero: cliente.genero,
          direccion: cliente.direccion,
          telefono: cliente.telefono,
          password: cliente.password,
          estado: cliente.estado,
        });
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
      },
    });
  }
}
