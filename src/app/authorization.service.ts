import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AppConfig } from './config/app-config';
  import { HttpHeaders } from '@angular/common/http';
import { PersoanaDTO } from './model/persoana-model';


@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  private apiUrl = 'http://localhost:8080/login';
  private tokenKey = 'auth_token';
  private user: PersoanaDTO | null = null;

  constructor(private httpClient: HttpClient) { }


  private isAuthenticated = false;

  // Method to check if the user is authenticated
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }


  getCurrentUser(): Observable<PersoanaDTO> {
    return this.httpClient.get<PersoanaDTO>(AppConfig.API_PATH + '/current-user');
  }


  // Method to set the authentication status
  setAuthenticated(status: boolean): void {
    this.isAuthenticated = status;
  }

  
  clearLocalStorage(): void {
    localStorage.removeItem('auth-header'); // Replace 'authToken' with the key for your authentication token
    localStorage.removeItem('tip');
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


  // Method to set the logged-in user
  setUser(user: PersoanaDTO | null): void {
    this.user = user;
  }

}

