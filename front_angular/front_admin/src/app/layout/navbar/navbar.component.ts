import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Output() toggle = new EventEmitter<void>();

  onToggle(event: Event) {
    event.preventDefault();
    this.toggle.emit();
  }

  // Fake data (PI)
  user = {
    name: 'Ons Chaima',
    image: 'assets/img/user.jpg'
  };

  messages = [
    { title: 'New message', time: '2 min ago', image: 'assets/img/user.jpg' },
    { title: 'Order received', time: '10 min ago', image: 'assets/img/user.jpg' }
  ];

  notifications = [
    { title: 'Profile updated', time: '5 min ago' },
    { title: 'New user added', time: '15 min ago' }
  ];

  goToProfile() {
    console.log('Profile');
  }

  goToSettings() {
    console.log('Settings');
  }

  logout() {
    console.log('Logout');
  }

}