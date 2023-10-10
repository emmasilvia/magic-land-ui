import { Component, Inject, OnInit } from '@angular/core';
import { ActivitateRequestDto, ActivitateResponseDto, HartaDto } from '../model/activitate-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivitateService } from '../activitate.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editare-activitate',
  templateUrl: './editare-activitate.component.html',
  styleUrls: ['./editare-activitate.component.scss']
})
export class EditareActivitateComponent implements OnInit {
  activitati: ActivitateResponseDto[] = [];
  activitate: ActivitateRequestDto = {} as ActivitateRequestDto;
  tipuriActivitate: string[] = [];
  niveleDificultate: string[] = [];
  zone: HartaDto[] = [];
  editActivitateForm: FormGroup = new FormGroup({}); // Initialize with an empty FormGroup
  id?: number;

  constructor(
    private activitateService: ActivitateService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    // Assuming this.activitate.zonaHarta is an object with the property 'denumire'
    

    
    public dialogRef: MatDialogRef<EditareActivitateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  
  ngOnInit(): void {
    const id = this.data; // Get the activity ID from the dialog data

    // Retrieve the activity data based on the ID and populate the form
    this.activitateService.getActivitateById(id).subscribe(
      (activitate: ActivitateResponseDto) => {
        this.editActivitateForm.patchValue(activitate);
        console.log(activitate.denumire, activitate.descriere, activitate.durata, activitate.id)
      },
      (error: string) => {
        console.log('Error retrieving activity: ' + error);
      }
    );

    this.activitateService.getTipuriActivitate().subscribe(
      (data) => {
        this.tipuriActivitate = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.activitateService.getNiveleDificultate().subscribe(
      (data) => {
        this.niveleDificultate = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.activitateService.getZone().subscribe((data) => {
      this.zone = data;
    }, error => {
      console.log(error);
    });

    this.editActivitateForm = this.formBuilder.group({
      id: [this.activitate.id || ''],
      denumire: [this.activitate.denumire || '', Validators.required],
      descriere: [this.activitate.descriere || '', Validators.required],
      durata: [this.activitate.durata || '', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      varstaMinima: [this.activitate.varstaMinima || '', Validators.required],
      program: [this.activitate.program || '', Validators.required],
      nivelDificultate: [this.activitate.nivelDificultate || '', Validators.required],
      tipActivitate: [this.activitate.tipActivitate || '', Validators.required],
      zona: [this.activitate.zonaHarta || '', Validators.required], 
      animal: [this.activitate.animale || '', Validators.required], 
      imagine: [this.activitate.imagine || '', Validators.required],
    });
  }



  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
