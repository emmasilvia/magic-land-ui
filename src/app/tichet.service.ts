import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from './config/app-config';
import { CategorieTichetDto, TichetRequestDto, TichetResponseDto } from './model/tichet-model';
import { BonDto } from './model/rezervare-model';

@Injectable({
  providedIn: 'root'
})
export class TichetService {

  TICHETE_API = AppConfig.API_PATH + '/tichete';
  constructor(private httpClient: HttpClient) {

  }
    
  create(nrBon: string, ticheteDtoList: TichetRequestDto[]): Observable<TichetResponseDto> {
    const params = new HttpParams().set('nrBon', nrBon);

    return this.httpClient.post<TichetResponseDto>(this.TICHETE_API, ticheteDtoList, { params });
  }
  
  getCategoriiTichete(): Observable<CategorieTichetDto[]> {
    return this.httpClient.get<CategorieTichetDto[]>(AppConfig.API_PATH + '/categorii-tichete');
  }

  getTipuriTichet(): Observable<string[]> {
    return this.httpClient.get<string[]>(AppConfig.API_PATH + '/tipuriTichet');
  }

  getBonId(nrBon: string): Observable<BonDto> {
    const params = { nr_bon: nrBon }; // Use the correct query parameter name 'nr_bon'
    return this.httpClient.get<BonDto>(this.TICHETE_API , { params: params });
  }
  

  findAllTichete(): Observable<TichetResponseDto[]> {
    return this.httpClient.get<TichetResponseDto[]>(this.TICHETE_API + '/all');
  }
}


