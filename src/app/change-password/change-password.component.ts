import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersoanaService } from '../persoana.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{

  changePasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private persoanaService: PersoanaService,
    private router: Router, private toastr:ToastrService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    const oldPassword = this.changePasswordForm.value.oldPassword;
    const newPassword = this.changePasswordForm.value.newPassword;
  
    // Get the email from the query parameters
    const email = this.route.snapshot.queryParamMap.get('email');
  
    if (email !== null) {
      this.persoanaService.changePassword(oldPassword, newPassword, email).subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error) => {
          this.toastr.error('parola incorecta');
        }
      );
    } else {
      // Handle the case where the email is null (not provided in the query parameters)
      this.toastr.error('Email parameter missing');
    }
  }
  
  
  }


