import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';

/**
 * @class SuppliersService
*/

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  private apiUrl = 'https://localhost:7148/api/Supplier'; // URL backendu

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiUrl}`);
  }

  public getSupplier(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}/${id}`);
  }

  public addSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.apiUrl, supplier);
  }

  public updateSupplier(supplier: Supplier): Observable<Supplier[]> {
    return this.http.put<Supplier[]>(`${this.apiUrl}/${supplier.id}`, supplier);
  }

  public deleteSupplier(supplier: Supplier): Observable<Supplier[]> {
    return this.http.delete<Supplier[]>(`${this.apiUrl}/${supplier.id}`);
  }

  /*public deleteSupplier(id: number): Observable<Supplier[]> {
    return this.http.delete<Supplier[]>(`${this.apiUrl}/${id}`);
  }*/
}
