import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];

  constructor() { }

  getProducts() {
    return of(this.products);
  }

  addProduct(product: Product) {
    const newProduct = {
      ...product,
      id: Date.now()
    };

    this.products.push(newProduct);
    return of(newProduct);
  }
}
