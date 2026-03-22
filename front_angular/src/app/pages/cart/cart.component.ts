import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
  }

  increase(item: any) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    }
  }

  remove(id: number) {
    this.cartService.removeItem(id);
    this.cartItems = this.cartService.getCart();
  }


  getTotal() {
    return this.cartService.getTotal();
  }

  getCount() {
    return this.cartService.getCount();
  }

  getImage(p: any) {
    return Array.isArray(p.image) ? p.image[0] : p.image;
  }

  showModal = false;

openModal() {
  this.showModal = true;
}

confirmClear() {
  this.cartService.clearCart();
  this.cartItems = [];
  this.showModal = false;
}

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }
}
