import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'clientes',
  },
  {
    path: 'clientes',
    loadComponent: () => import('./pages/clientes/clientes').then((m) => m.Clientes),
  },
  {
    path: 'clientes/nuevo',
    loadComponent: () =>
      import('./pages/clientes/form-clientes/form-clientes').then((m) => m.FormClientes),
  },
  {
    path: 'clientes/editar/:id',
    loadComponent: () =>
      import('./pages/clientes/form-clientes/form-clientes').then((m) => m.FormClientes),
  },
  {
    path: 'cuentas',
    loadComponent: () => import('./pages/cuentas/cuentas').then((m) => m.Cuentas),
  },
  {
    path: 'movimientos',
    loadComponent: () => import('./pages/movimientos/movimientos').then((m) => m.Movimientos),
  },
  {
    path: 'reportes',
    loadComponent: () => import('./pages/reportes/reportes').then((m) => m.Reportes),
  },
  {
    path: '**',
    redirectTo: 'clientes',
  },
];
