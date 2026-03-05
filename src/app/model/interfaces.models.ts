export interface Cliente {
  direccion: string;
  edad: number;
  estado: boolean;
  genero: string;
  idPersona?: number;
  identificacion: number;
  nombre: string;
  password: string;
  telefono: string;
}

export interface Cuenta {
  cliente: Cliente;
  estadoCuenta: boolean;
  idCuenta: number;
  numeroCuenta: string;
  saldoActual: number | null;
  saldoInicial: number;
  tipoCuenta: string;
}

export interface Movimiento {
  cuenta: Cuenta;
  fecha: string;
  idMovimiento: number;
  saldo: number;
  tipoMovimiento: string;
  valor: number;
}
