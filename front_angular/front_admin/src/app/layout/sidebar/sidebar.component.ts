import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  @Input() isSidebarOpen = true;

  ngOnInit() {
  const url = window.location.pathname;

  this.openMenu =
    url.includes('product') ? 'products' :
    url.includes('category') ? 'categories' :
    url.includes('user') ? 'users' :
    url.includes('order') ? 'orders' :
    url.includes('payment') ? 'payments' :
    url.includes('review') ? 'reviews' :
    url.includes('promotion') ? 'promotions' :
    null;
}

  openMenu: string | null = null;

  user = {
    name: 'Ons Chaima',
    role: 'Admin',
    image: 'assets/img/user.jpg'
  };

  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }
}