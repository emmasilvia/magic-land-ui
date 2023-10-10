import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';
import {ToastrService} from 'ngx-toastr';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { PersoanaDTO } from '../model/persoana-model';
import { PersoanaService } from '../persoana.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email='';
  password='';
  loginForm! : FormGroup;

  constructor(private authService: AuthorizationService, private router: Router, 
    private toastrService: ToastrService, private formBuilder:FormBuilder,
    private persoanaService: PersoanaService,private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.authService.doAuth(this.email, this.password).subscribe( (data) => {
      localStorage.setItem('tip', data.authorities[0].authority);
      this.router.navigate(['/activitati']);
    }, error => {
      this._snackBar.open(`Parola sau email incorect: ${error}`, 'Dismiss', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
    });
  }

resetPassword() {

      this.router.navigate(['/reset-parola']);
  
}

  
  
}


