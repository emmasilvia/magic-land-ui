import { Component, OnInit } from '@angular/core';
import { ActivitateRequestDto, ActivitateResponseDto, HartaDto } from '../model/activitate-model';
import { ActivitateService } from '../activitate.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adaugare-activitati',
  templateUrl: './adaugare-activitati.component.html',
  styleUrls: ['./adaugare-activitati.component.scss']
})
export class AdaugareActivitatiComponent implements OnInit{

  activitate: ActivitateRequestDto = {} as ActivitateRequestDto;
  tipuriActivitate: string[] = [];
  niveleDificultate: string[] = [];
  zone: HartaDto[] = [];
  imageFile: File | null = null;
  activitateForm: FormGroup;

  
  constructor(private activitateService: ActivitateService, private toastr: ToastrService, private formBuilder:FormBuilder, private _snackBar:MatSnackBar){
    this.activitateForm = this.formBuilder.group({
      denumire: ['', Validators.required],
      descriere: ['', Validators.required],
      durata: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      varstaMinima: ['', Validators.required],
      program: ['', Validators.required],
      nivelDificultate: ['', Validators.required],
      tipActivitate: ['', Validators.required],
      zona: ['', Validators.required],
      // animale: '',
      // imagine: ['', Validators.required],
    });
  }

  ngOnInit(): void {
     this.activitateService.getTipuriActivitate().subscribe((data) => {
      this.tipuriActivitate = data;
    }, error => {
      console.log(error);
    });

    this.activitateService.getNiveleDificultate().subscribe((data) => {
      this.niveleDificultate = data;
    }, error => {
      console.log(error);
    });

    this.activitateService.getZone().subscribe((data) => {
      this.zone = data;
    }, error => {
      console.log(error);
    });
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }
  
  

  save(): void {

    const requestDto: ActivitateRequestDto = {
      id: null,
      denumire: this.activitateForm.get('denumire')?.value,
      descriere: this.activitateForm.get('descriere')?.value,
      durata: this.activitateForm.get('durata')?.value,
      varstaMinima: this.activitateForm.get('varstaMinima')?.value,
      program: this.activitateForm.get('program')?.value,
      nivelDificultate: this.activitateForm.get('nivelDificultate')?.value,
      tipActivitate: this.activitateForm.get('tipActivitate')?.value,
      zonaHarta: this.activitateForm.get('zona')?.value,
      animale: [],
      imagine: 'assets/logo.png',
    };
  
    this.activitateService.createActivitate(requestDto).subscribe((response: ActivitateResponseDto) => {  
      this._snackBar.open('Activitate adaugata cu succes.', 'Dismiss', {
        duration: 5000,
        panelClass: ['success-snackbar'],
      });
       window.location.reload();
    }, error => {
      this._snackBar.open(`Activitatea nu a putut fi salvata: ${error}`, 'Dismiss', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
    });
  }
  
}

