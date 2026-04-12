import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  cartCount = 0;
  animateCart = false;

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    console.log("Logout...");
    this.closeMenu();

  }

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.count$.subscribe(count => {
      this.cartCount = count;
      this.animateCart = true;

      setTimeout(() => {
        this.animateCart = false;
      }, 400);
    });

    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
      this.isDark = true;
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      this.isDark = false;
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }

  isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;

    if (this.isDark) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }

}