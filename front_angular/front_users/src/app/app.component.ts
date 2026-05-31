import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'front_angular';

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.wsService.connect();

    const email = localStorage.getItem('email');

    if (email) {
      this.wsService.sendOnline(email);
    }
  }

  ngOnDestroy(): void {
    const email = localStorage.getItem('email');

    if (email) {
      this.wsService.sendOffline(email);
    }
  }
}