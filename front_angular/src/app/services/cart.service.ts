import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: any[] = [];

  private count = new BehaviorSubject<number>(0);
  count$ = this.count.asObservable();

  constructor() {
    const data = localStorage.getItem('cart');
    if (data) {
      this.cartItems = JSON.parse(data);
      this.updateCount();
    }
  }

  addToCart(product: any, quantity: number) {
    const existing = this.cartItems.find(p => p.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cartItems.push({ ...product, quantity });
    }

    this.updateCount(); 
  }

  getCart() {
    return this.cartItems;
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(p => p.id !== id);
    this.updateCount(); 
  }

  updateQuantity(id: number, quantity: number) {
    const item = this.cartItems.find(p => p.id === id);
    if (item) {
      item.quantity = quantity;
      this.updateCount();
    }
  }

  getTotal() {
    return this.cartItems.reduce((total, item) =>
      total + item.price * item.quantity, 0);
  }

  getCount() {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.updateCount();
  }

  private updateCount() {
    const total = this.getCount();
    this.count.next(total);

    // 🔥 save in localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
