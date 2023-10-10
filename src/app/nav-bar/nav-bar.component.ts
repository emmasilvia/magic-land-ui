import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';
import { PersoanaDTO } from '../model/persoana-model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {


  @Input() numberOfProductsInCart = 0;
  @Output() searchChangeEvent: EventEmitter<string> = new EventEmitter<string>();
  tip = localStorage.getItem('tip');
  persoana: PersoanaDTO[]=[];
  welcomeMessage: string; 
  isLoggedIn: boolean = true;


  constructor( private router: Router, public authService: AuthorizationService) {
      this.welcomeMessage = 'Bine ati venit ';
  }



   ngOnInit(): void {
  //   if (localStorage.getItem(AppConfig.AUTHORIZATION_HEADER)) {
  //     this.shoppingCartService.getProductsFromCart().subscribe((data) => {
  //       this.numberOfProductsInCart = data.productsInCart.length;
  //     });
  //   }

  this.authService.getCurrentUser().subscribe(
    (persoana: PersoanaDTO) => {
      if (persoana) {
        this.welcomeMessage = `Bine ati venit, ${persoana.nume} ${persoana.prenume}!`;
      } else {
        this.welcomeMessage = 'Bine ati venit!';
      }
    },
    (error) => {
      console.log('Error:', error);
    }
  );
  }

  searchProduct(event: any): void {

    const formValue = event.target.value;
    this.searchChangeEvent.emit(formValue);
  }

  goToShoppingCart(): void {
    this.router.navigate(['/shopping-cart']);
  }

  
  logout(): void {
    this.authService.clearLocalStorage();
    this.router.navigate(['/']);
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isRegisterPage(): boolean {
    return this.router.url === '/register';
  }
}
