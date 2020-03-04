import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = 'https://my-json-server.typicode.com/ShalaevDS/demo';

  constructor(private http: HttpClient) { }

  getApiEndpoints() {
    return this.http.get<any>(`${this.apiUrl}/urls`);
  }

  getItemsByType(type: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${type}`);
  }
}
