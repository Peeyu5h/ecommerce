import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../constants/api-endpoints';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryApi {

  private http = inject(HttpClient);
  private categoryUrl = API.CATEGORY.CATEGORIES;
  

  getAllCategory(): Observable<any>{
    const url = `${environment.apiUrl}${this.categoryUrl}`;
    return this.http.get(url);
  }
  
}
