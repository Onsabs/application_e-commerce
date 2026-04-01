import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';



interface User {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

export interface Order {
  id: number;
  date: string;
  items: OrderItem[];
  user: User;
  delivery: string;
  payment: string;
  message: string;
  status: string;
  total?: number;
}

// Ajouter export pour OrderItem
export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image?: string | string[];
}


@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

 ngOnInit() {
  this.orders = this.orderService.getOrders().map((order: Order) => ({
    ...order,
    id: order.id || Date.now(),
    date: order.date || new Date().toISOString(),
    items: order.items || []
  })) as Order[];


}

  /*getProductNames(items: OrderItem[]): string {
    if(!items || items.length === 0) return 'Aucun produit';
    return items.map(p => p.name).join(', ');
  }*/

  viewDetails(order: Order): void {
    localStorage.setItem('selectedOrder', JSON.stringify(order));
    this.router.navigate(['/history-details']);
  }
}
