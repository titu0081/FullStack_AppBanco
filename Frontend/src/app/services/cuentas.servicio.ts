import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api.services';
import { Cuenta } from '../model/interfaces.models';

@Injectable({
  providedIn: 'root',
})
export class CuentasService {
  private readonly endpoint = '/cuentas';

  constructor(private api: ApiHttpService) {}

  get(): Observable<Cuenta[]> {
    return this.api.get<Cuenta[]>(this.endpoint);
  }

  getByID(id: number): Observable<Cuenta> {
    return this.api.get<Cuenta>(`${this.endpoint}/${id}`);
  }

  post(data: Cuenta): Observable<Cuenta> {
    return this.api.post<Cuenta, Cuenta>(this.endpoint, data);
  }

  put(id: number, data: Cuenta): Observable<Cuenta> {
    return this.api.put<Cuenta, Cuenta>(`${this.endpoint}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
