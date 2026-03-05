import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api.services';
import { Cliente } from '../model/interfaces.models';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private readonly endpoint = '/clientes';

  constructor(private api: ApiHttpService) {}

  get(): Observable<Cliente[]> {
    return this.api.get<Cliente[]>(this.endpoint);
  }

  getByID(id: number): Observable<Cliente> {
    return this.api.get<Cliente>(`${this.endpoint}/${id}`);
  }

  post(data: Cliente): Observable<Cliente> {
    return this.api.post<Cliente, Cliente>(this.endpoint, data);
  }

  put(id: number, data: Cliente): Observable<Cliente> {
    return this.api.put<Cliente, Cliente>(`${this.endpoint}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
