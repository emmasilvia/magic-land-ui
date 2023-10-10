import { Component } from '@angular/core';
import { PersoanaDTO, Tip } from '../model/persoana-model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersoanaService } from '../persoana.service';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  requestUserDto: RequestPersoanaDto = {
    email: '',
    password: '',
    confirmPassword: ''
};

  tipuri: Tip[] = [];
  persoana: PersoanaDTO = {} as PersoanaDTO;
  registerForm!: FormGroup;

  constructor(private persoanaService: PersoanaService, private router: Router, private toastrService: ToastrService,private fb: FormBuilder) { 
   this.registerForm=this.fb.group({
      email: ['',[Validators.required, Validators.email]], 
      prenume: ['',Validators.required], 
      nume: ['',Validators.required], 
      password: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/)
      ]], 
      confirmPassword: ['', [
        Validators.required,
        this.matchPasswordValidator('password')
      ]],
      tip: ['',Validators.required],  
  });
}

matchPasswordValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.root.get(controlName);

    if (passwordControl && control.value !== passwordControl.value) {
      return { matchPassword: true };
    }

    return null;
  };
}


  ngOnInit(): void {

    


    this.persoanaService.getRoles().subscribe((data) => {
      this.tipuri = data;
    }, err => {
      this.toastrService.error('Nu se pot accesa tipurile');
    });
  }

  register(): void{
    this.persoanaService.register(this.persoana).subscribe((data) => {
      this.router.navigate(['/login']);
    }, errorMessage => {
      this.toastrService.error('User already registered or email invalid');
      console.log('error', errorMessage); 
    });
  }

}

export interface RequestPersoanaDto {
  email: string;
  password: string;
  confirmPassword: string;
}
