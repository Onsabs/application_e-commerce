import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts() {
    return of(this.products);
  }

  /*addProduct(product: Product) {
    const newProduct = {
      ...product,
      id: Date.now()
    };

    this.products.push(newProduct);
    return of(newProduct);
  }*/
 addProduct(product: Product) {
  return this.http.post<Product>('http://localhost:3000/products', product);
}
}
