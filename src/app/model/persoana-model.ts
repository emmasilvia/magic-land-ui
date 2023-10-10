export interface Tip {
    id : string;
    nume : string;
}

export interface PersoanaDTO{
    id : number | null;
    email: string | undefined;
    password: string;
    confirmPassword: string;
    prenume:string;
    nume:string;
    tip:string;
    
}

export interface SubscriberDTO{
    id: number;
    email: string;
}