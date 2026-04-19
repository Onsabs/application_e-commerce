import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  isSidebarClosed = false;

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
}
