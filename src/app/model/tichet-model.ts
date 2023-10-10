import { BonDto } from "./rezervare-model";

export interface TichetRequestDto{

    id:number | null;
    nrBilet: number | null;
    codAbonament: number | null;
    durataAbonament: number | null;
    tipTichet: string;
    stoc: number | null;
    bon: number | null;
    valabilitate: Date;
    categorie_tichet: CategorieTichetDto;
}

export interface TichetResponseDto{

    id:number ;
    nrBilet: number | null;
    codAbonament: number | null;
    durataAbonament: number;
    categorie_tichet: CategorieTichetDto;
    tipTichet: string;
    valabilitate: Date;
    stoc: number;
    bon: BonDto;
}

export interface CategorieTichetDto{
    categorieVarsta: string;
    tarif: number | null;
}

export interface TipTichet{
    id:number;
    nume:string;
}

export enum TipTichetEnum{
    BILET, ABONAMENT
}



export interface CategorieVarsta{
    id:number;
    nume:string;
}

export enum CategorieVarstaEnum{
    COPIL, STUDENT, ADULT
}

