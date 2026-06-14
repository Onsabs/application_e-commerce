import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private client!: Client;

  connect() {

    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      debug: (msg) => console.log('STOMP:', msg)
    });

    this.client.onConnect = () => {
      console.log('✅ WebSocket connected');

      this.client.subscribe('/topic/status', message => {
        console.log('STATUS:', message.body);
      });
    };

    this.client.onStompError = (frame) => {
      console.error('❌ STOMP error:', frame);
    };

    this.client.activate();
  }

  sendOnline(email: string) {
    if (this.client?.connected) {
      this.client.publish({
        destination: '/app/status/online',
        body: email
      });
    }
  }

  sendOffline(email: string) {
    if (this.client?.connected) {
      this.client.publish({
        destination: '/app/status/offline',
        body: email
      });
    }
  }
}