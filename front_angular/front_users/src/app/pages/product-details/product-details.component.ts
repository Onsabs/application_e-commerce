import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadProduct(id);
    });
  }

  isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
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
    if (sizeObj.stock === 0) {
      this.showToast(`❌ Taille ${sizeObj.size} indisponible`, 'error');
      return;
    }
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
    this.snackBar.open(message, '✕', {
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
  openSection: string | null = null;

  toggleSection(section: string) {
    this.openSection = this.openSection === section ? null : section;
  }
reviews: any[] = [
  { id: 1, stars: 5, comment: "Produit excellent 🔥" },
  { id: 2, stars: 4, comment: "Très bon qualité" }
];

/* ⭐ ADD */
newReview = {
  stars: 0,
  comment: ''
};

/* ✏ EDIT */
editReview = {
  stars: 0,
  comment: ''
};

editingId: number | null = null;

/* ⭐ AVERAGE */
getAverageRating(): number {
  if (this.reviews.length === 0) return 0;

  const sum = this.reviews.reduce((acc, r) => acc + r.stars, 0);
  return +(sum / this.reviews.length).toFixed(1);
}

/* ⭐ SELECT STAR (ADD) */
setRating(stars: number) {
  this.newReview.stars = stars;
}

/* ⭐ SELECT STAR (EDIT) */
setEditRating(stars: number) {
  this.editReview.stars = stars;
}

/* ➕ ADD REVIEW */
addReview() {
  if (this.newReview.stars === 0 || !this.newReview.comment.trim()) return;

  this.reviews.push({
    id: Date.now(),
    stars: this.newReview.stars,
    comment: this.newReview.comment
  });

  this.newReview = { stars: 0, comment: '' };
}

/* ✏ START EDIT */
startEdit(review: any) {
  this.editingId = review.id;

  this.editReview = {
    stars: review.stars,
    comment: review.comment
  };
}

/* ✅ UPDATE REVIEW */
updateReview(id: number) {
  const index = this.reviews.findIndex(r => r.id === id);

  if (index !== -1) {
    this.reviews[index] = {
      id,
      stars: this.editReview.stars,
      comment: this.editReview.comment
    };
  }

  this.cancelEdit();
}

/* 🗑 DELETE */
confirmDeleteId: number | null = null;
askDelete(id: number) {
  this.confirmDeleteId = id;
}

confirmDelete(id: number) {
  this.reviews = this.reviews.filter(r => r.id !== id);
  this.confirmDeleteId = null;
}

cancelDelete() {
  this.confirmDeleteId = null;
}

/* ❌ CANCEL */
cancelEdit() {
  this.editingId = null;
  this.editReview = { stars: 0, comment: '' };
}

}