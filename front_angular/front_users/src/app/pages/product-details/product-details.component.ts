import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  product: any;
  selectedImage: any;
  quantity = 1;
  wishlist = false;
  relatedProducts: any[] = [];
  selectedSize: any = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private favService: FavoritesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadProduct(id);
    });
  }

  loadProduct(id: number) {
    this.product = this.productService.getProductById(id);

    if (!Array.isArray(this.product.image)) {
      this.product.image = [this.product.image];
    }

    this.selectedImage = this.product.image[0];
    this.relatedProducts = this.productService.getRelatedProducts(this.product.category, id);
    this.wishlist = this.favService.isFavorite(this.product.id);
  }

  getImage(p: any) {
    return Array.isArray(p.image) ? p.image[0] : p.image;
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

  selectSize(sizeObj: any) {
    this.selectedSize = sizeObj;
    this.quantity = 1;
  }

  increase() {
    if (!this.selectedSize) {
      this.showToast('Choisis une taille d’abord ⚠️', 'error');
      return;
    }

    if (this.quantity < this.selectedSize.stock) {
      this.quantity++;
    } else {
      this.showToast(
        `⚠️ Max pour taille ${this.selectedSize.size} : ${this.selectedSize.stock}`,
        'error'
      );
    }
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.snackBar.open(message, 'Fermer', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type
    });
  }

  addToCart() {
    if (!this.selectedSize) {
      this.showToast('Please select a size ⚠️', 'error');
      return;
    }

    const productWithSize = { ...this.product, size: this.selectedSize.size, stock: this.selectedSize.stock };
    const result = this.cartService.addToCart(productWithSize, this.quantity);

    if (!result.success) {
      this.showToast(result.message!, 'error');
      return;
    }

    this.showToast(`${this.product.name} (${this.selectedSize.size})  a été ajouté au panier ✅`, 'success');
  }

  updateItemQuantity(id: number, size: string, quantity: number) {
    const result = this.cartService.updateQuantity(id, size, quantity);

    if (!result.success) {
      this.showToast(result.message!, 'error');
    } else {
      this.showToast(result.message!, 'success');
    }
  }

  toggleWishlist() {
    this.favService.toggle(this.product);
    this.wishlist = this.favService.isFavorite(this.product.id);
  }

  getTotalStock(product: any): number {

    if (!product.sizes || typeof product.sizes[0] === 'string') {
      return product.stock ?? 0;
    }

    return product.sizes.reduce((total: number, s: any) => total + s.stock, 0);
  }
}