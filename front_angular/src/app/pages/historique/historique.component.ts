import { Component } from '@angular/core';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent {

  cartItems: any[] = [];

  ngOnInit() {
    const data = localStorage.getItem('cart');

    if (data) {
      this.cartItems = JSON.parse(data);
    }
  }

  getTotal(item: any) {
    return item.price * item.quantity;
  }

  viewDetails(item: any) {
   
  }

}
