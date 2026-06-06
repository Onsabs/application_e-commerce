import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  // ===== GET =====
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }

  // ===== ADD =====
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.api, product);
  }

  // ===== DELETE =====
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  // ===== GET PRODUCT BY ID =====
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  // ===== UPDATE PRODUCT =====
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${product.id}`, product);
  }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      'http://localhost:8080/api/files/upload',
      formData,
      { responseType: 'text' }
    ).pipe(
      map(filename => `http://localhost:8080/uploads/${filename}`)
    );
  }

}