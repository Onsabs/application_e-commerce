import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private storageKey = 'orders';

  placeOrder(order: any) {
    const orders = this.getOrders();
    const newOrder = {
    ...order,
    id: Date.now(),
    date: new Date().toISOString(),
    status: 'pending' 
  };

    orders.push(newOrder);

    localStorage.setItem(this.storageKey, JSON.stringify(orders));

    console.log('Commande ajoutée:', newOrder);
    console.log('Toutes les commandes:', orders);
  }

  getOrders() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  clearOrders() {
    localStorage.removeItem(this.storageKey);
  }
}
