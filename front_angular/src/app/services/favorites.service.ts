import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites: any[] = [];

  toggle(product: any) {
    const exists = this.favorites.find(p => p.id === product.id);

    if (exists) {
      this.favorites = this.favorites.filter(p => p.id !== product.id);
    } else {
      this.favorites.push(product);
    }
  }

  getFavorites() {
    return this.favorites;
  }

  isFavorite(id: number) {
    return this.favorites.some(p => p.id === id);
  }
}
