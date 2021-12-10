import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbrirContaService {

  constructor(private httpClient: HttpClient) { }

  enviar(cadastro: any): Observable<any> {
    return this.httpClient.post(`http://localhost:4201/api/v1/conta-corrente`, cadastro);
  }
}
