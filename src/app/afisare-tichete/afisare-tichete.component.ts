import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategorieTichetDto, TichetRequestDto, TichetResponseDto } from '../model/tichet-model';
import { TichetService } from '../tichet.service';

@Component({
  selector: 'app-afisare-tichete',
  templateUrl: './afisare-tichete.component.html',
  styleUrls: ['./afisare-tichete.component.scss']
})
export class AfisareTicheteComponent implements OnInit{


  totalTarif: number = 0;
  tichete: TichetResponseDto[] = []



  constructor(@Inject(MAT_DIALOG_DATA) public details: any, private tichetService:TichetService){

this.totalTarif = details.tichete.reduce((acc: number, tichet: TichetResponseDto) => {
  if (tichet.categorie_tichet?.tarif) {
    return acc + tichet.categorie_tichet.tarif;
  } else {
    return acc; // Nu adăuga nimic dacă categorie_tichet sau tarif sunt null
  }
}, 0);


}

ngOnInit(): void {
}



}
