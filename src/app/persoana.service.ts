import { HttpClient } from '@angular/common/http';
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
}
