import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersoanaService } from '../persoana.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reseteaza-parola',
  templateUrl: './reseteaza-parola.component.html',
  styleUrls: ['./reseteaza-parola.component.scss']
})
export class ReseteazaParolaComponent implements OnInit {
  resetPasswordForm!: FormGroup;


  constructor(private fb: FormBuilder, private persoanaService: PersoanaService,
    private router: Router, private toastr:ToastrService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  resetPassword() {
    const email = this.resetPasswordForm.value.email;
    this.persoanaService.resetPassword(email).subscribe(
      () => {
        // Navigate to change password page with email as query parameter
        this.router.navigate(['/changepassword'], { queryParams: { email: email } });
      },
      (error) => {
        this.toastr.error('Email does not exist');
      }
    );
  }

}
