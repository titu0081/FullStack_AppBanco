import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.servicio';
import { Cliente } from '../../model/interfaces.models';

@Component({
  selector: 'app-clientes',
  imports: [],
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Clientes implements OnInit {
  private readonly clientesService = inject(ClientesService);
  private readonly router = inject(Router);

  readonly clientes = signal<Cliente[]>([]);
  readonly clientesSource = signal<Cliente[]>([]);
  readonly cargando = signal<boolean>(false);

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando.set(true);
    this.clientesService.get().subscribe({
      next: (data) => {
        const clientes = data ?? [];
        this.clientesSource.set(clientes);
        this.clientes.set(clientes);
        this.cargando.set(false);
      },
      error: () => {
        this.clientesSource.set([]);
        this.clientes.set([]);
        this.cargando.set(false);
      },
    });
  }

  goFormClient(): void {
    this.router.navigateByUrl('/clientes/nuevo');
  }

  goEditClient(cliente: Cliente): void {
    if (cliente.idPersona == null) {
      return;
    }

    this.router.navigate(['/clientes/editar', cliente.idPersona]);
  }

  deleteCliente(cliente: Cliente): void {
    if (cliente.idPersona == null) {
      return;
    }

    const confirmar = window.confirm(`Deseas eliminar al cliente ${cliente.nombre}?`);
    if (!confirmar) {
      return;
    }

    this.clientesService.delete(cliente.idPersona).subscribe({
      next: () => {
        const updated = this.clientesSource().filter((c) => c.idPersona !== cliente.idPersona);
        this.clientesSource.set(updated);
        this.clientes.set(updated);
      },
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim().toLowerCase();

    if (!query) {
      this.clientes.set(this.clientesSource());
      return;
    }

    const filtered = this.clientesSource().filter((cliente) =>
      Object.values(cliente).some((value) => String(value).toLowerCase().includes(query)),
    );

    this.clientes.set(filtered);
  }
}
