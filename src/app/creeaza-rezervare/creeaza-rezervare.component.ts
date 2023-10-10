import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RezervareService } from '../rezervare.service';
import { RezervareRequestDto, RezervareResponseDto } from '../model/rezervare-model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { AuthorizationService } from '../authorization.service';
import { PersoanaDTO } from '../model/persoana-model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as base64 from 'base-64';
import { MatDialog } from '@angular/material/dialog';
import { AfisareTicheteComponent } from '../afisare-tichete/afisare-tichete.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creeaza-rezervare',
  templateUrl: './creeaza-rezervare.component.html',
  styleUrls: ['./creeaza-rezervare.component.scss']
})
export class CreeazaRezervareComponent implements OnInit{
  
  today: Date = new Date;
  rezervare: RezervareRequestDto = {} as RezervareRequestDto;
  user: PersoanaDTO | undefined;
  selectedReservationDetails: any; 

  rezervari: RezervareResponseDto[] = [];
  tip = localStorage.getItem('tip');

  rezervareForm: FormGroup;
  showForm: boolean = false;


  constructor(private rezervareService: RezervareService, 
    private toastr: ToastrService, private router: Router, 
    private authService: AuthorizationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialog:MatDialog,
    private _snackBar: MatSnackBar
    ) {
    this.rezervareForm = this.formBuilder.group({
      dataVizita: ['', Validators.required], 
      nrPersoane: ['', Validators.required], 
      email: ['', Validators.required]
    });
  }

   decodeBasicAuthToken(authHeader: string): { username: string, password: string } | null {
    const encodedCredentials = authHeader.split(' ')[1]; 
    if (!encodedCredentials) {
        return null;
    }

    const decodedCredentials = base64.decode(encodedCredentials);
    const [username, password] = decodedCredentials.split(':');

    return { username, password };
}


//   ngOnInit(): void {
//     const userEmail = this.user?.email ?? ''; 
//     // this.authService.getUser(userEmail).subscribe(
//     //   (user: PersoanaDTO) => {
//     //     this.user = user;
//     //   },
//     //   (error) => {
//     //     console.error('Error retrieving user:', error);
//     //   }
//     // );


//     const token = localStorage.getItem('auth-header'); // Sau de unde păstrați token-ul
//     console.log(token);
//   if (token) {
//     const decodedCredentials = this.decodeBasicAuthToken(token);
//     console.log(decodedCredentials);
//     const persoanaEmail = decodedCredentials?.username ?? '';
//     console.log(persoanaEmail)
// this.rezervareService.getRezervariByEmail(persoanaEmail).subscribe(
//       (rezervari) => {
//         this.rezervari = rezervari;
//       },
//       (error) => {
//         console.error('Eroare la obținerea rezervărilor', error);
//       }
//     );
//     // Utilizați persoanaId în cererile către backend sau în orice alt scop necesar
//   } else {
//     console.error('Token not found');
//     // Tratați cazul în care token-ul nu există (utilizatorul nu este autentificat)
//   }

//   this.rezervareService.getAllReservations().subscribe(
//     (rezervari) => {
//       this.rezervari = rezervari;
//     },
//     (error) => {
//       console.log('Eroare la obtinerea rezervarilor', error);
//     }
//   )
    
//   }
  
ngOnInit(): void {
  const userEmail = this.user?.email ?? '';
  
  // ... Other code ...
  const token = localStorage.getItem('auth-header');
  if (token) {
      const decodedCredentials = this.decodeBasicAuthToken(token);
      console.log(decodedCredentials);
       const persoanaEmail = decodedCredentials?.username ?? '';
      console.log(persoanaEmail)
    
    if (this.tip == 'ADMINISTRATOR') {
      this.rezervareService.getAllReservations().subscribe(
        (rezervari) => {
          rezervari.sort((a, b) => {
            return new Date(a.dataRezervare).getTime() - new Date(b.dataRezervare).getTime();
          });
  
          this.rezervari = rezervari;
        },
        (error) => {
          console.log('Eroare la obtinerea rezervarilor', error);
        }
      );
    } else {
      this.rezervareService.getRezervariByEmail(persoanaEmail).subscribe(
        (rezervari) => {
          this.rezervari = rezervari;
        },
        (error) => {
          console.error('Eroare la obținerea rezervărilor', error);
        }
      );
    }
  } else {
    console.error('Token not found');
    // Tratați cazul în care token-ul nu există (utilizatorul nu este autentificat)
  }

  this.route.queryParams.subscribe((params) => {
    // Check if the 'id' parameter exists
    if (params['id']) {
      this.showForm = true;
    } else {
      this.showForm = false;
    }
  });
}




  creeazaRezervare(): void {
    const token = localStorage.getItem('auth-header'); // Sau de unde păstrați token-ul
    console.log(token);
  if (token) {
    const decodedCredentials = this.decodeBasicAuthToken(token);
    console.log(decodedCredentials);
    const persoanaEmail = decodedCredentials?.username ?? '';
    const selectedActivitateId = +this.route.snapshot.queryParams['id'];
    this.rezervareService.getPersoanaByEmail(persoanaEmail).pipe(
      map((persoana: PersoanaDTO) => {
        if (persoana) {
         
          const requestDto: RezervareRequestDto = {
            id: null,
            dataRezervare: new Date(),
            dataVizita: this.rezervareForm.get('dataVizita')?.value,
            persoana: persoanaEmail, 
            nrPersoane: this.rezervareForm.get('nrPersoane')?.value,
            
            bon: {
              id: null
            },
            activitateId: selectedActivitateId
          };
        
          this.rezervareService.createRezervare(requestDto).subscribe(
            (response: RezervareResponseDto) => {
              this.toastr.success('Rezervare adaugata cu succes.');
              const nrBon = response.bon.nrBon;
              this.rezervareService.setNrPersoane(response.nrPersoane);
              this.router.navigate(['/tichete'], { queryParams: { nrBon: nrBon } });
            },
            (errorMsg: string) => {
              this._snackBar.open(`Selectati alta data a vizitei sau alta activitate: ${errorMsg}`, 'Dismiss', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            });
            } 
          );
        } else {
          this.toastr.error('Persoana nu a fost gasita!');
        }
      })
    ).subscribe();
  }
  

}

showReservationDetails(id: number): void {
  this.rezervareService.getReservationDetails(id).subscribe(
    (details: any) => {
      const dialogRef = this.dialog.open(AfisareTicheteComponent, {
        width: '350px',
        data: details, // Pass the details directly
        
      });
      console.log(id);
      console.log(details); // Print details to console for testing
    },
    (error) => {
      console.error('Error fetching reservation details:', error);
    }
  );
}


deleteRezervare(id: number): void {
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    width: '250px',
    data: 'Sigur doriți să ștergeți acest element?',
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
      this.rezervareService.deleteReservation(id).subscribe(
        () => {
          // No need to pass "activitate" here, since it's a delete operation
          this.toastr.success('Rezervare stearsa cu succes.');
          window.location.reload();
        },
        (error) => {
          // Check if the error response indicates success (e.g., HTTP status 200)
          if (error.status === 200) {
            // Assuming your server returns 200 for successful deletions
            this.toastr.success('Rezervare stearsa cu succes.');
            window.location.reload();
          } else {
            this.toastr.error('Rezervarea nu a fost stearsa !!! [' + error.message + ']');
          }
        }
      );
    }
  });
}


}

