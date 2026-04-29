import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isSidebarOpen = true;
  isMobileView = false;
  userToggled = false;

  ngOnInit() {
    this.checkScreen();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreen();
  }

  checkScreen() {
    this.isMobileView = window.innerWidth < 992;

    if (!this.userToggled) {
      this.isSidebarOpen = !this.isMobileView;
    }

    // reset toggle when switching to desktop
    if (!this.isMobileView) {
      this.userToggled = false;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.userToggled = true;
  }

  isMobile(): boolean {
    return this.isMobileView;
  }
}