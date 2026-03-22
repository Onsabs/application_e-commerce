import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
cartCount = 0;
animateCart = false;

constructor(private cartService: CartService) {}

ngOnInit() {
  this.cartService.count$.subscribe(count => {
    this.cartCount = count;
    this.animateCart = true;

    setTimeout(() => {
      this.animateCart = false;
    }, 400);
  });
}
}
