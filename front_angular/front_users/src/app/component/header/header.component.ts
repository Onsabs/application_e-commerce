import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartCount = 0;
  animateCart = false;

  isMenuOpen = false;
  isProfileOpen = false;
  isDark = false;

  constructor(
    private cartService: CartService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    // CART
    this.cartService.count$.subscribe(count => {
      this.cartCount = count;
      this.animateCart = true;

      setTimeout(() => this.animateCart = false, 400);
    });

    // THEME
    const savedTheme = localStorage.getItem('theme') || 'light';

    this.isDark = savedTheme === 'dark';

    document.body.classList.toggle('dark-mode', this.isDark);
    document.body.classList.toggle('light-mode', !this.isDark);
  }

  // ================= MENU =================
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isProfileOpen = false;
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isProfileOpen = false;
  }

  // ================= PROFILE =================
  toggleProfile() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.isProfileOpen = !this.isProfileOpen;
    this.isMenuOpen = false;
  }

  // ================= LOGOUT =================
  logout() {
    this.authService.logout();
    this.isProfileOpen = false;
    this.router.navigate(['/login']);
  }

  // ================= THEME =================
  toggleTheme() {
    this.isDark = !this.isDark;

    document.body.classList.toggle('dark-mode', this.isDark);
    document.body.classList.toggle('light-mode', !this.isDark);

    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }
}