import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Producto } from './share/models/app.producto.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getProductos(params?: HttpParams): Observable<Producto[]> {
    // get Domicilio from api
    return this.http.get <Producto[]>(`${environment.BACKEND_URL}/productos`, { params });
  }

  getProducto(id: string): Observable<Producto> {
    // get Domicilio from api
    return this.http.get <Producto>(`${environment.BACKEND_URL}/productos/${id}`);
  }

  saveProducto(producto: Producto): Observable<string> {
    if ( producto._id ) {
      return this.putProducto(producto);
    }
    return this.postProducto(producto);
  }

  // Add new Domicilio
  private postProducto(domicilio: Producto): Observable<string> {
    return this.http.post <string>(`${environment.BACKEND_URL}/productos`, domicilio);
  }

  // Update existing Domicilio
  private putProducto(domicilio: Producto): Observable<string> {
    return this.http.put <string>(`${environment.BACKEND_URL}/productos/${domicilio._id}`, domicilio);
  }

  removeProducto(id: number): Observable<string> {
    return this.http.delete <string>(`${environment.BACKEND_URL}/productos/${id}`);
  }

}
