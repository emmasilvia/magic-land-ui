import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import {ToastrModule} from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { ActivitatiParcComponent } from './activitati-parc/activitati-parc.component';
import { FormsModule } from '@angular/forms';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { ParcComponent } from './parc/parc.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { AdaugareActivitatiComponent } from './adaugare-activitati/adaugare-activitati.component';
import { CreeazaRezervareComponent } from './creeaza-rezervare/creeaza-rezervare.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TicheteComponent } from './tichete/tichete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditareActivitateComponent } from './editare-activitate/editare-activitate.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { HartaComponent } from './harta/harta.component';
import { JwtModule } from '@auth0/angular-jwt';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatSortModule } from '@angular/material/sort';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AfisareTicheteComponent } from './afisare-tichete/afisare-tichete.component';
import { PersoanaService } from './persoana.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReseteazaParolaComponent } from './reseteaza-parola/reseteaza-parola.component';
const firebaseConfig = {
  // Your Firebase configuration here
};
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivitatiParcComponent,
    NavBarComponent,
    ParcComponent,
    AdaugareActivitatiComponent,
    CreeazaRezervareComponent,
    TicheteComponent,
    EditareActivitateComponent,
    DeleteDialogComponent,
    HartaComponent,
    AfisareTicheteComponent,
    ChangePasswordComponent,
    ReseteazaParolaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right', 
    }),
    FormsModule,
    MatButtonModule,
    MatTreeModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatGridListModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    MatSortModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    
      
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
