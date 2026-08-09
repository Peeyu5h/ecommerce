import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API } from '../constants/api-endpoints';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderApi {

  private http = inject(HttpClient);
  private orderUrl = API.ORDER.ORDERS;

  createOrder(): Observable<any>{
    const url = `${environment.apiUrl}${this.orderUrl}`;
    return this.http.post( url, {});
  }
}
