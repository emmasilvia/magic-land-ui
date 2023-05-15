import { Component } from '@angular/core';
import { PersoanaDTO, Tip } from '../model/persoana-model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersoanaService } from '../persoana.service';

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

  constructor(private persoanaService: PersoanaService, private router: Router, private toastrService: ToastrService) { }

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
      this.toastrService.error('User already registered');
      console.log('error', errorMessage); // TODO toastrService error
    });
  }

}

export interface RequestPersoanaDto {
  email: string;
  password: string;
  confirmPassword: string;
}
