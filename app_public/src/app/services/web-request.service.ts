
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3006';
   }

   getAll(uri: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.ROOT_URL}/${uri}`);
  }

  getSingle(uri: string, id: string) {
    return this.http.get<any[]>(`${this.ROOT_URL}/${uri}/${id}`);
  }

  getProductsByTheme1(uri: string, theme: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.ROOT_URL}/${uri}/${theme}`);
  }

  post(uri: String, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  put(uri: string, productId: string, payload: any) {
    return this.http.put(`${this.ROOT_URL}/${uri}/${productId}`, payload);
  }

  delete(uri: String): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}