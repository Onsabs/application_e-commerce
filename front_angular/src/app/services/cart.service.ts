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
    if (product.stock === 0) {
      return { success: false, message: '❌ Produit en rupture de stock' };
    }

    const existing = this.cartItems.find(p => p.id === product.id && p.size === product.size);

    if (existing) {
      const remaining = product.stock - existing.quantity;
      if (remaining <= 0) {
        return {
          success: false,
          message: `⚠️ Tu as déjà atteint la quantité maximum de "${product.name}"`
        };
      }
      if (existing.quantity + quantity > product.stock) {
        return {
          success: false,
          message: `⚠️ Tu peux ajouter seulement ${remaining} de "${product.name}"`
        };
      }
      existing.quantity += quantity;
    } else {
      if (quantity > product.stock) {
        return {
          success: false,
          message: `⚠️ Tu peux ajouter seulement ${product.stock} de "${product.name}"`
        };
      }
      this.cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.size,
        quantity: quantity,
        stock: product.stock
      });
    }

    this.updateCount();
    return { success: true };
  }

  updateQuantity(id: number, size: string, quantity: number) {
    const item = this.cartItems.find(p => p.id === id && p.size === size);
    if (!item) return { success: false, message: 'Produit non trouvé' };

    const remaining = item.stock - quantity;

    if (quantity > item.stock) {
      return {
        success: false,
        message: remaining > 0
          ? `⚠️ Tu peux ajouter seulement ${remaining} de "${item.name}"`
          : `⚠️ Tu as déjà atteint la quantité maximum de "${item.name}"`
      };
    }

    if (quantity <= 0) {
      this.removeItem(id, size);
      return { success: true, message: `"${item.name}" (${size}) retiré du panier 🗑️` };
    }

    item.quantity = quantity;
    this.updateCount();
    return { success: true, message: `"${item.name}"(${size}) a été mis à jour ✅` };
  }

  removeItem(id: number, size: string) {
    this.cartItems = this.cartItems.filter(
      p => !(p.id === id && p.size === size));
    this.updateCount();
  }

  getCart() {
    return this.cartItems;
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
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }


}