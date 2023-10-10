import { Component, OnInit } from '@angular/core';
import { ActivitateFilters, ActivitateRequestDto, ActivitateResponseDto } from '../model/activitate-model';
import { ActivitateService } from '../activitate.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditareActivitateComponent } from '../editare-activitate/editare-activitate.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { PersoanaService } from '../persoana.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-activitati-parc',
  templateUrl: './activitati-parc.component.html',
  styleUrls: ['./activitati-parc.component.scss']
})
export class ActivitatiParcComponent implements OnInit{

  activitati: ActivitateResponseDto [] = [];
  tipuriActivitati: string[] = [];
  niveleDificultate: string[] = [];
  totalNumberOfElements = 0;
  paginatorSize = 5;
  activitateFilters: ActivitateFilters = {
    denumire: '',
    durataMinima: 0,
    durataMaxima:0,
    varstaMinima: 0,
    varstaMaxima:0,
    nivelDificultate: '',
    tipActivitate:''
  };
  tip = localStorage.getItem('tip');
  subForm! : FormGroup;
  selectedFile: File | null = null;

  constructor(private activitateService: ActivitateService,
    private toastrService: ToastrService, private router:Router,
     private dialog:MatDialog,
     private storage: AngularFireStorage,
     private persoanaService: PersoanaService,
     private formBuilder:FormBuilder,private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.getActivitati(0, this.paginatorSize, {});
    this.activitateService.getTipuriActivitate().subscribe( (data) => {
      this.tipuriActivitati = data;
    });
    this.activitateService.getNiveleDificultate().subscribe( (data) => {
      this.niveleDificultate = data;
    });

    this.subForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });

  }

  getImageUrl(imageId: string): Observable<string | null> {
    const storageRef = this.storage.ref('activitati');
    const imageRef = storageRef.child(imageId);
    const imageUrl$ = imageRef.getDownloadURL();
    imageUrl$.subscribe(url => console.log('Image URL:', url));
    return imageUrl$;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(activityId: number) {
    if (!this.selectedFile) {
      return;
    }
  
    this.activitateService.uploadImage(activityId, this.selectedFile).subscribe(
      (snapshot) => {
        if (snapshot && snapshot.state === 'success') {
          console.log('Upload successful!');
          // Perform additional actions if needed
        }
      },
      (error) => {
        console.error('Error uploading photo:', error);
      }
    );
  }
  
  

  getActivitati(page: number, pageSize: number, filters: ActivitateFilters): void{
    this.activitateService.getActivitati(page, pageSize, filters).subscribe((data) => {
      this.activitati = data.content;
      this.totalNumberOfElements = data.totalElements;
    });
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: 'Sigur doriți să ștergeți acest element?',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.activitateService.deleteActivitate(id).subscribe(
          (activitate) => {
            this.toastrService.success('Activitate stearsa')
        
            this.router.navigate(['/activitati']);
            window.location.reload();
          },
          error => {
            if (error.status === 400) {
              this._snackBar.open(`Activitatea nu a putut fi stearsa deoarece apartine unei rezervari: ${error}`, 'Dismiss', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            });
            } else {
              this._snackBar.open(`Activitatea stearsa: ${error}`, 'Dismiss', {
                duration: 5000,
                panelClass: ['error-snackbar'],
              });
              window.location.reload();
    
            }
            
          });
      }
    });
  }
  
  update(id: number): void {
    const dialogRef = this.dialog.open(EditareActivitateComponent, {
      width: '350px',
      data: id,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        const updatedActivitate: ActivitateRequestDto = dialogRef.componentInstance.editActivitateForm.value; // Use the form value instead of accessing the component instance
        
        // Make sure to set the 'descriere' field if it's not provided
        if (!updatedActivitate.descriere) {
          updatedActivitate.descriere = 'Descriere'; // Provide a default value or an empty string
        }

           
        
        this.activitateService.update(id, updatedActivitate).subscribe(
          (activitate) => {
            this.toastrService.success('Activitate editata cu succes.');
            this.router.navigate(['/activitati']);
            window.location.reload();
          },
          (errorMsg) => {
            this.toastrService.error('Activitatea nu a fost editata! [' + errorMsg + ']');
          }
        );
      }
    });
  }
  
  

  rezerva(id: number): void{
    this.activitateService.getActivitateById(id).subscribe(
      (activitate) => {
        this.toastrService.success('Rezerva activitatea cu id-ul' + id);
        this.router.navigate(['/rezervare'], { queryParams: { id: id.toString() } });
      },(error:string) => {
        this.toastrService.error('Nu s-a putut rezerva activitatea');
      });
  }


  filterActivitati(event: string): void{
    this.activitateFilters.denumire = event;
    this.getActivitati(0, this.paginatorSize, this.activitateFilters);
  }

  changeDurataMinima(event: any): void{
    if (event.target.value === '') {
      this.activitateFilters.durataMinima = 0;
    }else {
      this.activitateFilters.durataMinima = event.target.value;
    }
    this.getActivitati(0, this.paginatorSize, this.activitateFilters);
  }



  changeDurataMaxima(event: any): void {
    if (event.target.value === '') {
      this.activitateFilters.durataMaxima = undefined;
    }else {
      this.activitateFilters.durataMaxima = event.target.value;
    }
    this.getActivitati(0, this.paginatorSize, this.activitateFilters);
  }

  changeVarstaMinima(event: any): void{
    if (event.target.value === '') {
      this.activitateFilters.varstaMinima = 0;
    }else {
      this.activitateFilters.varstaMinima = event.target.value;
    }
    this.getActivitati(0, this.paginatorSize, this.activitateFilters);
  }

  
  changeVarstaMaxima(event: any): void {
    if (event.target.value === '') {
      this.activitateFilters.varstaMaxima = undefined;
    }else {
      this.activitateFilters.varstaMaxima = event.target.value;
    }
    this.getActivitati(0, this.paginatorSize, this.activitateFilters);
  }

  
  filterActivitateNivelDificultate(event: any): void{
    this.activitateFilters.nivelDificultate = event.value;
    this.getActivitati(0, this.paginatorSize, this.activitateFilters);
  }

  filterTipActivitate(event: any): void {
      this.activitateFilters.tipActivitate = event.value;
      this.getActivitati(0, this.paginatorSize, this.activitateFilters);
  }

  changePage(event: PageEvent): void{
    this.paginatorSize = event.pageSize;
    this.getActivitati(event.pageIndex, event.pageSize, {});
  }
  // sendEmail() {
  //   const email = this.subForm.value.email; // Get the email value from the form control
  //   this.persoanaService.sendEmail(email).subscribe(
  //     (response) => {
  //       console.log(response); // Log the text response
  //       this.toastrService.success('Email sent successfully');
  //       window.location.reload();
  //     },
  //     (error) => {
  //       console.log(error);
  //       this.toastrService.error('Error sending email:'+ error);
  //     }
  //   );
  // }
  sendEmail() {
    const email = this.subForm.value.email;
  
    this.persoanaService.sendEmail(email).subscribe(
      (response) => {
        console.log(response);
        this._snackBar.open('Email sent successfully', 'Dismiss', {
          duration: 3000, // Display duration in milliseconds
        });
        window.location.reload();
      },
      (error) => {
        console.log(error);
        this._snackBar.open(`Error sending email: ${error}`, 'Dismiss', {
          duration: 5000,
          panelClass: ['error-snackbar'], // Add custom CSS class if needed
        });
      }
    );
  }

}
