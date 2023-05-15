import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from './config/app-config';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader: string | null = localStorage.getItem(AppConfig.AUTHORIZATION_HEADER);
    if (authHeader) {
      req = req.clone( {
        setHeaders: {
          Authorization: authHeader
        }
      });
    }
    return next.handle(req);
  }
}
