import { Component } from '@angular/core';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.scss']
})
export class HistoryDetailsComponent {

  items: any[] = [];

  ngOnInit() {
    // temporaire: on prend les données depuis localStorage
    const data = localStorage.getItem('cart');

    if (data) {
      this.items = JSON.parse(data);
    }
  }

}
