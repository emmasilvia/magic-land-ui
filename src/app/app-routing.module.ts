import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActivitatiParcComponent } from './activitati-parc/activitati-parc.component';


const routes: Routes = [
  {path : 'login' , component: LoginComponent},
  {path : 'register', component: RegisterComponent},
  {path : 'parc', component:ActivitatiParcComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
