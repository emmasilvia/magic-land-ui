import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AppConfig } from './config/app-config';
  import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  private apiUrl = 'http://localhost:8080/login';
  private tokenKey = 'auth_token';

  constructor(private httpClient: HttpClient) { }



  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return token !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  doAuth(email: string, password: string): Observable<any>{
    return this.httpClient.post(AppConfig.API_PATH + '/login', {}, {
      headers: {
        Authorization: this.buildAuthorizationHeaders(email, password)
      }
    });
  }

  buildAuthorizationHeaders(email: string, password: string): string {
    const authHeader = 'Basic ' + btoa(email + ':' + password);
    localStorage.setItem(AppConfig.AUTHORIZATION_HEADER, authHeader);
    return authHeader;
  }

}

