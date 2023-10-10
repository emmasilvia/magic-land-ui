
export interface ActivitateRequestDto{

    id: number | null;
    denumire: string;
    descriere: string;
    durata: number;
    varstaMinima: number;
    program: string;
    nivelDificultate: string;
    tipActivitate: string;
    zonaHarta: string;
    animale: Animal[];
    imagine: string | null;
  
  }
  
  export interface ActivitateResponseDto{

    id: number;
    denumire: string;
    descriere: string;
    durata: number;
    varstaMinima: number;
    nivelDificultate: string;
    program: string;
    tipActivitate: string;
    zonaHarta: HartaDto[];
    animale: Animal[];
    imagine: string;
  
  }

  export interface TipActivitate{
    id: number;
    nume:string;
  }

  export enum TipActivitateEnum{
    Sportiva, Relaxare, Divertisment
  }

  export interface NivelDificultate{
    id: number;
    nume:string;
  }

  export enum NivelDificultateEnum{
    USOR, MEDIU, AVANSAT
  }

  export interface PaginatedActivitateResponse {
    content: ActivitateResponseDto[];
    totalElements: number;
  }

  export interface Animal {
    id: number;
    name: string;
    descriere: string;
    rasa: string;
    varsta: number;
    activitateId: number;
}

export interface HartaDto{
  id: number;
  denumire:string;
  latitude: number;
  longitude: number; 
}

  export interface ActivitateFilters {
    denumire?: string | undefined;
    durataMinima?: number | undefined;
    durataMaxima?: number | undefined;
    varstaMinima?: number | undefined;
    varstaMaxima?:number | undefined;
    nivelDificultate?: string | undefined;
    tipActivitate?: string | undefined;
  } 