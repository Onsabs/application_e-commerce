import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.snackBar.open(message, '✕', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type
    });
  }

  increase(item: any) {
    const result = this.cartService.updateQuantity(item.id, item.size, item.quantity + 1);

    if (!result.success) {
      this.showToast(result.message!, 'error');
    }
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      const result = this.cartService.updateQuantity(item.id, item.size, item.quantity - 1);

      if (!result.success) {
        this.showToast(result.message!, 'error');
      }
    }
  }

  remove(item: any) {
  this.cartService.removeItem(item.id, item.size);
  this.cartItems = this.cartService.getCart();

  this.showToast(`"${item.name}" (${item.size}) retiré 🗑️`, 'success');
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

    this.showToast('Panier vidé 🧹', 'success');
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  goToCheckout() {
    if (this.cartItems.length === 0) {
      this.showToast('❌ Panier vide', 'error');
      return;
    }

    this.router.navigate(['/checkout']);
  }
}