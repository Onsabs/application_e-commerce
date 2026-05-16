import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private storageKey = 'products';

  private productsSubject = new BehaviorSubject<Product[]>(this.getFromStorage());

  products$ = this.productsSubject.asObservable();

  constructor() { }

  // ===== GET =====
  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  // ===== ADD =====
  addProduct(product: Product) {
    const products = this.getFromStorage();

    product.id = Date.now(); 

    product.createdAt = new Date();
    products.push(product);

    this.saveToStorage(products);

    this.productsSubject.next(products);

    return of(product);
  }

  // ===== DELETE =====
  deleteProduct(id: number) {
    let products = this.getFromStorage();

    products = products.filter(p => p.id !== id);

    this.saveToStorage(products);

    this.productsSubject.next(products);

    return of(true);
  }

  // ===== STORAGE HELPERS =====
  private getFromStorage(): Product[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private saveToStorage(products: Product[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  // ===== GET PRODUCT BY ID =====
  getProductById(id: number): Product | undefined {
    const products = this.getFromStorage();

    return products.find(p => p.id === id);
  }

  // ===== UPDATE PRODUCT =====
  updateProduct(updatedProduct: Product) {

    let products = this.getFromStorage();

    products = products.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );

    this.saveToStorage(products);

    this.productsSubject.next(products);

    return of(updatedProduct);
  }

}