import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieTichetDto, TichetRequestDto, TichetResponseDto, TipTichet } from '../model/tichet-model';
import { TichetService } from '../tichet.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';
import { RezervareService } from '../rezervare.service';
import { BonService } from '../bon.service';
import { BonDto } from '../model/rezervare-model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-tichete',
  templateUrl: './tichete.component.html',
  styleUrls: ['./tichete.component.scss']
})
export class TicheteComponent implements OnInit{
  nrPersoane?: number;
  categorii: CategorieTichetDto[] = [];
  tipuriTichet: string[] = [];
  tichete: TichetResponseDto[] = [];
  tichetForm: FormGroup;
  bonId?: number;
  tip = localStorage.getItem('tip');
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<TichetResponseDto>(this.tichete);
  totalTicheteSelectate: number = 0;


  constructor(
    private formBuilder: FormBuilder,
    private tichetService: TichetService,
    private router: Router,
    private toastr: ToastrService,
    private rezervareService: RezervareService,
    private _snackBar: MatSnackBar
  ) {
    this.tichetForm = this.formBuilder.group({
      tichetFormArray: this.formBuilder.array([])
    });

    this.nrPersoane = this.rezervareService.getNrPersoane();

    for (let i = 0; i < this.nrPersoane; i++) {
      const tichetGroup = this.formBuilder.group({
        categorie_tichet: ['', Validators.required],
        tipTichet: ['', Validators.required],
        durataAbonament:['']
      });

      this.tichetFormArray.push(tichetGroup);
    }

  }

  columnsToDisplay: string[] = ['id', 'nrBilet', /* ... alte coloane ... */];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.tichetService.getCategoriiTichete().subscribe(
      (data) => {
        this.categorii = data;
        console.log(this.categorii)
      },
      (err: string) => {
        console.log(err);
      }
    );

    this.tichetService.getTipuriTichet().subscribe(
      (data) => {
        this.tipuriTichet = data;
      },
      (err: string) => {
        console.log(err);
      }
    );

    this.loadTickets();

 

  }



  get tichetFormArray(): FormArray {
    return this.tichetForm.get('tichetFormArray') as FormArray;
  }

  // salveazaTichetele(): void {
  //   if (this.nrPersoane === undefined) {
  //     this.toastr.error(
  //       'Number of people is undefined. Cannot proceed with saving tickets.'
  //     );
  //     return;
  //   }
  
  //   const ticheteDtoList: TichetRequestDto[] = [];
  //   const nrBon = this.router.parseUrl(this.router.url).queryParams['nrBon'];
  //   console.log('nrBon:', nrBon);


  
  //   this.tichetService.getBonId(nrBon).subscribe(
  //     (bonId: BonDto) => {
  //       console.log('Bon id: ', bonId.id)
       

            
  //           //   if (this.nrPersoane !== undefined) {
  //           //     for (let i = 0; i < this.nrPersoane; i++) {  
  //           //   const tichetDto: TichetRequestDto = {
  //           //     id:null,
  //           //     nrBilet: null,
  //           //     codAbonament: null,
  //           //     durataAbonament: this.tichetForm.get('durataAbonament')?.value,
  //           //     categorie_tichet: this.tichetForm.get('categorie_tichet')?.value,
  //           //     valabilitate: new Date(),
  //           //     tipTichet: this.tichetForm.get('tipTichet')?.value,
  //           //     stoc: null,
  //           //     bon: bonId.id, 
  //           //   };
          
  //           //  ticheteDtoList.push(tichetDto);
  //           // }}
  
  //         this.tichetService.create(nrBon, ticheteDtoList).subscribe(
  //           (response: TichetResponseDto) => {
  //             this.toastr.success('Tichete adaugate cu succes.');
  //             this.router.navigate(['']);
  //           },
  //           (errorMsg: string) => {
  //             this.toastr.error(
  //               'Rezervarea nu a fost salvata !!! [' + errorMsg + ']'
  //             );
  //           }
  //         );
  //       }
  //     // },
  //     // (error: any) => {
  //     //   this.toastr.error('Error fetching bonId: ' + error);
  //     // }
  //   );
  // }




  salveazaTichetele(): void {
    if (this.nrPersoane === undefined) {
      this.toastr.error(
        'Number of people is undefined. Cannot proceed with saving tickets.'
      );
      return;
    }
  
    const ticheteDtoList: TichetRequestDto[] = [];
    const nrBon = this.router.parseUrl(this.router.url).queryParams['nrBon'];
    console.log('nrBon:', nrBon);
  
    // Add null check for this.nrPersoane
    if (this.nrPersoane !== undefined) {
      for (let i = 0; i < this.nrPersoane; i++) {
        const ticketGroup = this.tichetFormArray.controls[i] as FormGroup;
  
        const tichetDto: TichetRequestDto = {
          id: null,
          categorie_tichet: ticketGroup.get('categorie_tichet')?.value,
        
          nrBilet: null,
          codAbonament: null,
          durataAbonament: ticketGroup.get('durataAbonament')?.value,
          tipTichet: ticketGroup.get('tipTichet')?.value,
          valabilitate: new Date(),
          stoc: 0,
          bon: nrBon,
        };
  
        ticheteDtoList.push(tichetDto);
      }
    }
  
    this.tichetService.create(nrBon, ticheteDtoList).subscribe(
      (response: TichetResponseDto) => {
        this._snackBar.open('Tichete adaugate cu succes.', 'Dismiss', {
          duration: 5000,
          panelClass: ['success-snackbar'],
        });
        this.router.navigate(['/rezervare']);
      },
      error => {
        this._snackBar.open(`Tichetele nu au fost salvate: ${error}`, 'Dismiss', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      });
    
  }
  

  loadTickets() {
    this.tichetService.findAllTichete().subscribe(
      (tickets: TichetResponseDto[]) => {
        this.tichete = tickets;
      },
      (error) => {
        console.log('Error retrieving tickets:', error);
      }
    );
  }



  findAll(): void {
    this.tichetService.findAllTichete().subscribe(
      (response: TichetResponseDto[]) => { // Update the response type to Tichet[]
        this.tichete = response; // Assign the response to the tichete property
        this.toastr.success('Tichete afisate');
      },
      (errorMsg: string) => {
        this.toastr.error('Nu se poate afisa!!! [' + errorMsg + ']');
      }
    );
  }


  
  
}

