import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersoanaDTO, Tip } from './model/persoana-model';
import { Observable } from 'rxjs';
import { AppConfig } from './config/app-config';
import { RequestPersoanaDto } from './register/register.component';

@Injectable({
  providedIn: 'root'
})
export class PersoanaService {

  API_PATH = 'http://localhost:8080/register';

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<Array<Tip>> {
    return this.httpClient.get<Array<Tip>>(AppConfig.API_PATH + '/persoane/tipuri');

  }

  register(persoanaDto: PersoanaDTO): Observable<PersoanaDTO> {
    return this.httpClient.post<PersoanaDTO>(AppConfig.API_PATH + '/register', persoanaDto);
  }

  create(requestPersoanaDto: RequestPersoanaDto): Observable<any> {
    return this.httpClient.post<RequestPersoanaDto>(this.API_PATH, requestPersoanaDto);
  }

  sendEmail(email: string): Observable<any> {
    const url = AppConfig.API_PATH + '/subscribe';
    return this.httpClient.post(url, email , { responseType: 'text' } );
  }

  resetPassword(email: string): Observable<any> {
    const requestBody = { email };
    return this.httpClient.post(AppConfig.API_PATH+'/reset', requestBody, {responseType: 'text'});
  }


  changePassword(oldPassword: string, newPassword: string, email: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('oldPassword', oldPassword)
      .set('newPassword', newPassword);

    return this.httpClient.post(AppConfig.API_PATH + '/changepassword', {}, { params, responseType: 'text' });
  }

}
