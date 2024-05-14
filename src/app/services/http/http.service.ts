import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);

  constructor() { }

  public get(url: string): Observable<any> {

    const baseUrl = environment.serverBaseUrl
    return this.http.get(`${baseUrl}/${url}`);
  }
}
