import { Injectable } from '@angular/core';
import { AppConfig } from './config/app-config';
import { HttpClient } from '@angular/common/http';
import { RezervareRequestDto, RezervareResponseDto } from './model/rezervare-model';
import { Observable } from 'rxjs';
import { PersoanaDTO } from './model/persoana-model';

@Injectable({
  providedIn: 'root'
})
export class RezervareService {

  private nrPersoane: number;
  private bonId: number;

  constructor(private httpClient: HttpClient){
      this.nrPersoane = 0;
      this.bonId = 0;
  }
  
  setBonId(bonId: number): void {
    this.bonId = bonId;
  }

  getBonId(): number {
    return this.bonId;
  }

  setNrPersoane(nrPersoane: number): void {
    this.nrPersoane = nrPersoane;
  }

  getNrPersoane(): number {
    return this.nrPersoane;
  }
  REZERVARE_API = AppConfig.API_PATH + '/rezervare';


  createRezervare(rezervareRequestDto: RezervareRequestDto): Observable<RezervareResponseDto> {
    return this.httpClient.post<RezervareResponseDto>(this.REZERVARE_API, rezervareRequestDto);
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.REZERVARE_API + '/delete' + id);
  }

  getPersoanaByEmail(email: string): Observable<PersoanaDTO> {
    return this.httpClient.get<PersoanaDTO>(AppConfig.API_PATH + '/persoane/' + email );
  }

  getRezervareByNrBon(nrBon: string): Observable<RezervareResponseDto> {
    return this.httpClient.get<RezervareResponseDto>(this.REZERVARE_API + '/' + nrBon);
  }

  getRezervariByEmail(email: string): Observable<RezervareResponseDto[]> {
    return this.httpClient.get<RezervareResponseDto[]>(AppConfig.API_PATH + '/persoane/revervari/' + email);
  }

  getReservationDetails(reservationId: number): Observable<any> {
    return this.httpClient.get(AppConfig.API_PATH + '/reservation/' + reservationId + '/details');
  }

  getAllReservations(): Observable<RezervareResponseDto[]> {
    return this.httpClient.get<RezervareResponseDto[]>(AppConfig.API_PATH + '/rezervari');
  }

  deleteReservation(id: number): Observable<any>{
    return this.httpClient.delete(AppConfig.API_PATH + '/reservation/' + id)
  }
  
}
