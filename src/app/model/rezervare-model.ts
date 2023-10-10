import { PersoanaDTO } from "./persoana-model";


export interface RezervareRequestDto {
    id: number | null;
    dataRezervare: Date;
    dataVizita: Date;
    nrPersoane: number;
    persoana: string;
    bon : {};
    activitateId: number;
}

export interface RezervareResponseDto{
    id: number;
    dataRezervare: Date;
    dataVizita: Date;
    nrPersoane: number;
    persoana: PersoanaDTO;
    bon : BonDto;
    activitateId: number;
}

export interface BonDto{
    id: number | null;
    nrBon: string;
    dataBon: Date;
}