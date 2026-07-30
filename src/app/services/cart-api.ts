import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../constants/api-endpoints';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartApi {
  
  private http = inject(HttpClient);
  private cartUrl = API.CART.CART;

  getCartItems(): Observable<any>{
    const url = `${environment.apiUrl}${this.cartUrl}`;
    return this.http.get( url );
  }

  addToCart(productId: string, quantity: number): Observable<any>{
    const url = `${environment.apiUrl}${this.cartUrl}`;
    const payload = { productId, quantity }
    return this.http.post( url ,payload );
  }

  updateCart(productId: string, quantity: number, cartItemId: string): Observable<any>{
    const url = `${environment.apiUrl}${this.cartUrl}/${cartItemId}`;
    const payload = { productId, quantity }
    return this.http.put( url ,payload );
  }

  removeCartItem(cartItemId: string): Observable<any>{
    const url = `${environment.apiUrl}${this.cartUrl}/${cartItemId}`;
    return this.http.delete( url );
  }

  deleteCart(): Observable<any>{
    const url = `${environment.apiUrl}${this.cartUrl}`;
    return this.http.delete( url );
  }
}
