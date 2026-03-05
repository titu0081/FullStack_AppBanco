import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'clientes',
  },
  {
    path: 'clientes',
    loadComponent: () =>
      import('./pages/clientes/clientes').then((m) => m.Clientes),
  },
  {
    path: 'clientes/nuevo',
    loadComponent: () =>
      import('./pages/clientes/form-clientes/form-clientes').then(
        (m) => m.FormClientes,
      ),
  },
  {
    path: 'clientes/editar/:id',
    loadComponent: () =>
      import('./pages/clientes/form-clientes/form-clientes').then(
        (m) => m.FormClientes,
      ),
  },
  {
    path: 'cuentas',
    loadComponent: () =>
      import('./pages/cuentas/cuentas').then((m) => m.Cuentas),
  },
  {
    path: 'cuentas/nuevo',
    loadComponent: () =>
      import('./pages/cuentas/form-cuentas/form-cuentas').then(
        (m) => m.FormCuentas,
      ),
  },
  {
    path: 'cuentas/editar/:id',
    loadComponent: () =>
      import('./pages/cuentas/form-cuentas/form-cuentas').then(
        (m) => m.FormCuentas,
      ),
  },
  {
    path: 'movimientos',
    loadComponent: () =>
      import('./pages/movimientos/movimientos').then((m) => m.Movimientos),
  },
  {
    path: 'movimientos/nuevo',
    loadComponent: () =>
      import('./pages/movimientos/form-movimientos/form-movimientos').then(
        (m) => m.FormMovimientos,
      ),
  },
  {
    path: 'movimientos/editar/:id',
    loadComponent: () =>
      import('./pages/movimientos/form-movimientos/form-movimientos').then(
        (m) => m.FormMovimientos,
      ),
  },
  {
    path: 'reportes',
    loadComponent: () =>
      import('./pages/reportes/reportes').then((m) => m.Reportes),
  },
  {
    path: '**',
    redirectTo: 'clientes',
  },
];
