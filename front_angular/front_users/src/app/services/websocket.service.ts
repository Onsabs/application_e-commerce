import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private client!: Client;

  connect() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000
    });

    this.client.onConnect = () => {
      this.client.subscribe('/topic/status', message => {
        console.log('STATUS:', message.body);
      });
    };

    this.client.activate();
  }

  //  USER ONLINE
  sendOnline(email: string) {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: '/app/status/online',
        body: email
      });
    }
  }

  //  USER OFFLINE
  sendOffline(email: string) {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: '/app/status/offline',
        body: email
      });
    }
  }
}