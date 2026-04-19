import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() toggleSidebarEvent = new EventEmitter<void>();

  toggleSidebar(event: Event) {
    event.preventDefault();
    this.toggleSidebarEvent.emit();
  }
}
