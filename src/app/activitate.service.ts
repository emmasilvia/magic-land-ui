import { Injectable } from '@angular/core';
import { AppConfig } from './config/app-config';
import { HttpClient } from '@angular/common/http';
import { ActivitateFilters, ActivitateRequestDto, ActivitateResponseDto, HartaDto, PaginatedActivitateResponse } from './model/activitate-model';
import { Observable } from 'rxjs';
import { CategorieTichetDto } from './model/tichet-model';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ActivitateService {
  ACTIVITATE_API = AppConfig.API_PATH + '/activitati';

  
  constructor(private httpClient:HttpClient,private storage: AngularFireStorage) { }

  createActivitate(activitateRequestDto: ActivitateRequestDto): Observable<ActivitateResponseDto> {
    return this.httpClient.post<ActivitateResponseDto>(this.ACTIVITATE_API, activitateRequestDto);
  }

  deleteActivitate(id: number): Observable<number>{
    return this.httpClient.delete<number>(this.ACTIVITATE_API + '/delete/' + id);
  }

  update(id: number, activitate: ActivitateRequestDto): Observable<ActivitateResponseDto> {
    return this.httpClient.put<ActivitateResponseDto>(this.ACTIVITATE_API + '/' +id, activitate);
  }

  // request form: localhost:8080/activitati?page=0&pageSize=10
  getActivitati(page: number, pageSize: number, activitateFilter: ActivitateFilters): Observable<PaginatedActivitateResponse> {
    let ACTIVITATE_API_WITH_PAGE = this.ACTIVITATE_API + '?page=' + page + '&pageSize=' + pageSize;
    if (activitateFilter.denumire) {
      ACTIVITATE_API_WITH_PAGE = ACTIVITATE_API_WITH_PAGE + '&denumire=' + activitateFilter.denumire;
    }
    if (!activitateFilter.durataMinima === undefined) {
      activitateFilter.durataMinima = 0;
    }
    if (activitateFilter.durataMinima !== undefined) {
      ACTIVITATE_API_WITH_PAGE = ACTIVITATE_API_WITH_PAGE + '&durata=durataMinima:' + activitateFilter.durataMinima + ',';
    }
    if (activitateFilter.durataMaxima){
      ACTIVITATE_API_WITH_PAGE = ACTIVITATE_API_WITH_PAGE + 'durataMaxima:' + activitateFilter.durataMaxima;
    }
    if (!activitateFilter.varstaMinima === undefined) {
      activitateFilter.varstaMinima = 0;
    }
    if (activitateFilter.varstaMinima !== undefined) {
      ACTIVITATE_API_WITH_PAGE = ACTIVITATE_API_WITH_PAGE + '&varsta=varstaMinima:' + activitateFilter.varstaMinima + ',';
    }
    if (activitateFilter.varstaMaxima){
      ACTIVITATE_API_WITH_PAGE = ACTIVITATE_API_WITH_PAGE + 'varstaMaxima:' + activitateFilter.varstaMaxima;
    }
    if (activitateFilter.nivelDificultate){
      ACTIVITATE_API_WITH_PAGE = ACTIVITATE_API_WITH_PAGE + '&nivelDificultate=' + activitateFilter.nivelDificultate;
    }
    if (activitateFilter.tipActivitate) {
      ACTIVITATE_API_WITH_PAGE = ACTIVITATE_API_WITH_PAGE + '&tipActivitate=' + activitateFilter.tipActivitate;
    }

    return this.httpClient.get<PaginatedActivitateResponse>(ACTIVITATE_API_WITH_PAGE);
  }

  getTipuriActivitate(): Observable<string[]> {
    return this.httpClient.get<string[]>(AppConfig.API_PATH + '/tipuriActivitate');
  }

  getNiveleDificultate(): Observable<string[]> {
    return this.httpClient.get<string[]>(AppConfig.API_PATH + '/niveleDificultate');
  }

  getZone(): Observable<HartaDto[]> {
    return this.httpClient.get<HartaDto[]>(AppConfig.API_PATH + '/zone');
  }

  getActivitateById(id: number): Observable<ActivitateResponseDto> {
    return this.httpClient.get<ActivitateResponseDto>(this.ACTIVITATE_API + '/' + id);
  }

  findByZonaHarta(denumire: string): Observable<ActivitateResponseDto[]> {
    return this.httpClient.get<ActivitateResponseDto[]>(AppConfig.API_PATH + '/harta/' + denumire);
  }

  getActivitiesWithZones(): Observable<ActivitateResponseDto[]> {
    return this.httpClient.get<ActivitateResponseDto[]>(AppConfig.API_PATH+ '/harta');
  }

  uploadImage(activityId: number, file: File) {
    const filePath = `activitati/${activityId}_${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return task.snapshotChanges(); // You might want to return a more meaningful response
  }
}
