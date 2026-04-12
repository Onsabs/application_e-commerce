import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {

  favorites: any[] = [];

  constructor(private favService: FavoritesService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.favorites = this.favService.getFavorites();
  }

  remove(product: any) {
    this.favService.toggle(product);
    this.favorites = this.favService.getFavorites();
  }

  getImage(p: any) {
    return Array.isArray(p.image) ? p.image[0] : p.image;
  }

  addToCart(product: any) {
    this.cartService.addToCart(product, 1);
  }

  getTotalStock(product: any): number {

    if (!product.sizes || typeof product.sizes[0] === 'string') {
      return product.stock ?? 0;
    }

    return product.sizes.reduce((total: number, s: any) => total + s.stock, 0);
  }

}
