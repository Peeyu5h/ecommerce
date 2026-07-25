import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { API } from '../constants/api-endpoints';
import { Observable } from 'rxjs';
import { LoginPayload, RegisterPayload } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private http  = inject(HttpClient);
  private loginUrl = API.AUTH.LOGIN;
  private registerUrl = API.AUTH.REGISTER;

  login(payload: LoginPayload): Observable<any>{
    const url = `${environment.apiUrl}${this.loginUrl}`;
    return this.http.post(url, payload)
  }

  register(payload : RegisterPayload): Observable<any>{
    const url = `${environment.apiUrl}${this.registerUrl}`;
    return this.http.post(url, payload);
  }
}
