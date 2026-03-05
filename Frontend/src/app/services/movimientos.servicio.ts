import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api.services';
import { Movimiento } from '../model/interfaces.models';

@Injectable({
  providedIn: 'root',
})
export class MovimientosService {
  private readonly endpoint = '/movimientos';

  constructor(private api: ApiHttpService) {}

  get(): Observable<Movimiento[]> {
    return this.api.get<Movimiento[]>(this.endpoint);
  }

  getByID(id: number): Observable<Movimiento> {
    return this.api.get<Movimiento>(`${this.endpoint}/${id}`);
  }

  post(data: Movimiento): Observable<Movimiento> {
    return this.api.post<Movimiento, Movimiento>(this.endpoint, data);
  }

  put(id: number, data: Movimiento): Observable<Movimiento> {
    return this.api.put<Movimiento, Movimiento>(`${this.endpoint}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
