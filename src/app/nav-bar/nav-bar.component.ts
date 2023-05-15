import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {


  @Input() numberOfProductsInCart = 0;
  @Output() searchChangeEvent: EventEmitter<string> = new EventEmitter<string>();
  tip = localStorage.getItem('TIP');

  constructor( private router: Router) {
  }

   ngOnInit(): void {
  //   if (localStorage.getItem(AppConfig.AUTHORIZATION_HEADER)) {
  //     this.shoppingCartService.getProductsFromCart().subscribe((data) => {
  //       this.numberOfProductsInCart = data.productsInCart.length;
  //     });
  //   }
  }

  searchProduct(event: any): void {

    const formValue = event.target.value;
    this.searchChangeEvent.emit(formValue);
  }

  goToShoppingCart(): void {
    this.router.navigate(['/shopping-cart']);
  }

  logout(): void {
    localStorage.clear();
    this.ngOnInit();
    this.router.navigate(['/login']);
  }
}
