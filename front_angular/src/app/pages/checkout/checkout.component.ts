import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartItems: any[] = [];
  openSection: string = 'info';

  user = {
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  };

  message: string = '';
  delivery = 'home';
  payment = 'cash';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) { }

  toggle(section: string) {
    this.openSection = this.openSection === section ? '' : section;
  }
  ngOnInit() {
    this.cartItems = this.cartService.getCart();
  }

  getImage(p: any) {
    return Array.isArray(p.image) ? p.image[0] : p.image;
  }
  
  getTotal() {
    return this.cartItems.reduce((sum, item) =>
      sum + item.price * item.quantity, 0);
  }

  // livraison dynamique
  getDeliveryFee() {
    return this.delivery === 'home' ? 7 : 0;
  }

  // total final
  getTotalWithDelivery() {
    return this.getTotal() + this.getDeliveryFee();
  }

  placeOrder() {
    if (!this.user.firstName || !this.user.phone || !this.user.address) {
      alert('Remplissez les informations personnelles ❗');
      return;
    }

    const order = {
      user: this.user,
      items: this.cartItems,
      delivery: this.delivery,
      payment: this.payment,
      message: this.message,
      total: this.getTotalWithDelivery()
    };

    console.log('Nouvelle commande:', order);

    this.orderService.placeOrder(order);

    this.cartService.clearCart();

    this.router.navigate(['/order-success']);
  }
}
