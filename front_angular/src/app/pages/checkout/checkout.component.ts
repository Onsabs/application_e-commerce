import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  showToast(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['toast']
    });
  }

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
    if (this.cartItems.length === 0) {
      this.showToast('Panier vide 🛒');
      return;
    }
    if (!this.user.firstName || !this.user.phone || !this.user.address) {
      this.showToast('Remplissez les informations ❗');
      return;
    }

    const order = {
      user: this.user,
      items: this.cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        size: item.size,
        image: item.image,
        quantity: item.quantity
      })),
      delivery: this.delivery,
      payment: this.payment,
      message: this.message,
      total: this.getTotalWithDelivery()
    };

    console.log('Nouvelle commande:', order);

    this.orderService.placeOrder(order);

    this.cartService.clearCart();

    this.showToast('Commande confirmée ✅');

    this.router.navigate(['/order-success']);
  }
  
}
