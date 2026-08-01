import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API } from '../constants/api-endpoints';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  private http = inject(HttpClient);
  private productUrl = API.PRODUCT.PRODUCTS;

  addProducts(product: Product): Observable<any>{
    const url = `${environment.apiUrl}${this.productUrl}`;
    return this.http.post(url, product);
  }

  getAllProducts(): Observable<any>{
    const url = `${environment.apiUrl}${this.productUrl}`;
    return this.http.get(url);
  }

  getProductById(id: string): Observable<any>{
    const url = `${environment.apiUrl}${this.productUrl}/${id}`;
    return this.http.get(url);
  }

  updateProduct(id: string, product: Product): Observable<any>{
    const url = `${environment.apiUrl}${this.productUrl}/${id}`;
    return this.http.put(url, product);
  }

  deleteProduct(id: string): Observable<any>{
    const url = `${environment.apiUrl}${this.productUrl}/${id}`;
    return this.http.delete(url)
  }
}
