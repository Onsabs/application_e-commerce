import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api =
    'http://localhost:8080/api/products';

  constructor(
    private http: HttpClient
  ) {}

  // ============================================================
  // PRODUCTS
  // ============================================================

  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(
      this.api
    );
  }

  addProduct(
    product: Product
  ): Observable<Product> {

    return this.http.post<Product>(
      this.api,
      product
    );
  }

  getProductById(
    id: number
  ): Observable<Product> {

    return this.http.get<Product>(
      `${this.api}/${id}`
    );
  }

  updateProduct(
    product: Product
  ): Observable<Product> {

    return this.http.put<Product>(
      `${this.api}/${product.id}`,
      product
    );
  }

  deleteProduct(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.api}/${id}`
    );
  }

  // ============================================================
  // UPLOAD IMAGE
  // ============================================================

  uploadImage(
    file: File
  ): Observable<string> {

    const formData =
      new FormData();

    formData.append(
      'file',
      file
    );

    /*
     * IMPORTANT:
     *
     * Le backend retourne seulement:
     *
     * abc123_tshirt.jpg
     *
     * On garde ce filename.
     *
     * On NE construit PAS:
     *
     * http://localhost:8080/uploads/...
     *
     * parce que la DB doit garder seulement
     * le filename.
     */

    return this.http.post(
      'http://localhost:8080/api/files/upload',
      formData,
      {
        responseType: 'text'
      }
    );
  }
}