import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private client: HttpClient) {
  }

  get(path: string): Observable<any> {
    return this.client.get(environment.baseUrl + path);
  }

  post(path: string, data: any): Observable<any> {
    return this.client.post(environment.baseUrl + path, data);
  }

  put(path: string, data: any): Observable<any> {
    return this.client.put(environment.baseUrl + path, data);
  }

  delete(path: string): Observable<any> {
    return this.client.delete(environment.baseUrl + path);
  }
}
