import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';
import {ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email='';
  password='';


  constructor(private authService: AuthorizationService, private router: Router, private toastrService: ToastrService) {}
  ngOnInit(): void {
    
  }

  login(): void {
    this.authService.doAuth(this.email, this.password).subscribe( (data) => {
      localStorage.setItem('tip', data.authorities[0].authority);
      this.router.navigate(['/parc']);
    }, error => {
      this.toastrService.error('User or password incorrect');
    });
  }

  
}


