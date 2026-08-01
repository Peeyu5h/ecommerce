import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API } from '../constants/api-endpoints';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistApi {

  private http = inject(HttpClient);
  private wishlistUrl = API.WISHLIST.WISHLIST;

  getWishListItems(): Observable<any>{
    const url = `${environment.apiUrl}${this.wishlistUrl}`;
    return this.http.get( url );
  }

  addToWishList(productId: string ): Observable<any>{
    const url = `${environment.apiUrl}${this.wishlistUrl}`;
    const payload = { productId }
    return this.http.post( url ,payload );
  }

  removeWishListItem(productId: string): Observable<any>{
    const url = `${environment.apiUrl}${this.wishlistUrl}/${productId}`;
    return this.http.delete( url );
  }

  deleteWishList(): Observable<any>{
    const url = `${environment.apiUrl}${this.wishlistUrl}`;
    return this.http.delete( url );
  }
  
}
