import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActivitatiParcComponent } from './activitati-parc/activitati-parc.component';
import { ParcComponent } from './parc/parc.component';
import { AdaugareActivitatiComponent } from './adaugare-activitati/adaugare-activitati.component';
import { CreeazaRezervareComponent } from './creeaza-rezervare/creeaza-rezervare.component';
import { TicheteComponent } from './tichete/tichete.component';
import { EditareActivitateComponent } from './editare-activitate/editare-activitate.component';
import { HartaComponent } from './harta/harta.component';
import { AfisareTicheteComponent } from './afisare-tichete/afisare-tichete.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReseteazaParolaComponent } from './reseteaza-parola/reseteaza-parola.component';


const routes: Routes = [
  {path : 'login' , component: LoginComponent},
  {path : 'register', component: RegisterComponent},
  {path : 'activitati', component:ActivitatiParcComponent},
  {path : '', component: ParcComponent},
  {path : 'adauga-activitati', component: AdaugareActivitatiComponent},
  {path : 'rezervare', component: CreeazaRezervareComponent},
  {path : 'tichete', component: TicheteComponent},
  {path: 'activitati/:id',component: EditareActivitateComponent},
  {path: 'harta', component: HartaComponent},
  {path: 'reservation/:id/details', component: AfisareTicheteComponent},
  {path: 'changepassword', component: ChangePasswordComponent},
  {path: 'reset-parola', component: ReseteazaParolaComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
