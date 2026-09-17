import { Component, OnInit } from '@angular/core';
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
export class ProductDetailsComponent implements OnInit {

  product: any = null;

  selectedImage: string = '';
  selectedVariant: any = null;
  selectedSize: any = null;

  quantity = 1;
  wishlist = false;

  relatedProducts: any[] = [];

  readonly IMG_BASE = 'http://localhost:8080/uploads/';

  openSection: string | null = null;

  /* =========================
     REVIEWS
  ========================= */

  reviews: any[] = [
    {
      id: 1,
      stars: 5,
      comment: 'Produit excellent 🔥'
    },
    {
      id: 2,
      stars: 4,
      comment: 'Très bonne qualité'
    }
  ];

  newReview = {
    stars: 0,
    comment: ''
  };

  editReview = {
    stars: 0,
    comment: ''
  };

  editingId: number | null = null;
  confirmDeleteId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private favService: FavoritesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const idParam = params.get('id');

      if (!idParam) {
        return;
      }

      const id = Number(idParam);

      if (isNaN(id)) {
        return;
      }

      this.loadProduct(id);
    });
  }

  /* =========================
     PRODUCT
  ========================= */

  loadProduct(id: number): void {

    this.productService.getProductById(id).subscribe({

      next: (product: any) => {

        if (!product) {
          return;
        }

        this.product = product;

        /*
         * Sécurité si le backend retourne null
         */
        if (!this.product.variants) {
          this.product.variants = [];
        }

        /*
         * Sélectionner la première variante
         */
        if (this.product.variants.length > 0) {

          this.selectedVariant = this.product.variants[0];

          /*
           * Sélectionner la première image
           */
          if (
            this.selectedVariant.images &&
            this.selectedVariant.images.length > 0
          ) {

            this.selectedImage = this.getImageUrl(
              this.selectedVariant.images[0]
            );

          } else {

            this.selectedImage = 'assets/images/no-image.png';

          }

        } else {

          this.selectedVariant = null;
          this.selectedImage = 'assets/images/no-image.png';

        }

        /*
         * Vérifier favoris
         */
        this.wishlist = this.favService.isFavorite(this.product.id);

        /*
         * Produits connexes
         */
        this.loadRelatedProducts();

      },

      error: (error) => {

        console.error(
          'Erreur lors du chargement du produit :',
          error
        );

        this.showToast(
          'Impossible de charger le produit',
          'error'
        );

      }

    });
  }

  loadRelatedProducts(): void {

    if (!this.product) {
      return;
    }

    this.productService.getProducts().subscribe({

      next: (products: any[]) => {

        this.relatedProducts = products.filter(
          (p: any) =>
            p.category === this.product.category &&
            p.id !== this.product.id
        );

      },

      error: (error) => {
        console.error(
          'Erreur produits connexes :',
          error
        );
      }

    });
  }

  /* =========================
     IMAGES
  ========================= */

  getImageUrl(img: string | null | undefined): string {

    if (!img) {
      return 'assets/images/no-image.png';
    }

    const image = img.trim();

    /*
     * Image locale Angular
     */
    if (image.startsWith('blob:')) {
      return image;
    }

    /*
     * URL complète
     */
    if (
      image.startsWith('http://') ||
      image.startsWith('https://')
    ) {
      return image;
    }

    /*
     * /uploads/image.jpg
     */
    if (image.startsWith('/uploads/')) {
      return 'http://localhost:8080' + image;
    }

    /*
     * uploads/image.jpg
     */
    if (image.startsWith('uploads/')) {
      return 'http://localhost:8080/' + image;
    }

    /*
     * image.jpg
     */
    return this.IMG_BASE + image;
  }

  getImage(product: any): string {

    const img =
      product?.variants?.[0]?.images?.[0];

    return this.getImageUrl(img);
  }

  selectImage(img: string): void {

    this.selectedImage = this.getImageUrl(img);
  }

  /* =========================
     VARIANTS / COLORS
  ========================= */

  selectVariant(variant: any): void {

    if (!variant) {
      return;
    }

    this.selectedVariant = variant;

    /*
     * Nouvelle image principale
     */
    if (
      variant.images &&
      variant.images.length > 0
    ) {

      this.selectedImage =
        this.getImageUrl(variant.images[0]);

    } else {

      this.selectedImage =
        'assets/images/no-image.png';

    }

    /*
     * Reset taille
     */
    this.selectedSize = null;

    /*
     * Reset quantité
     */
    this.quantity = 1;
  }

  /* =========================
     SIZES
  ========================= */

  selectSize(sizeObj: any): void {

    if (!sizeObj) {
      return;
    }

    if (sizeObj.stock <= 0) {

      this.showToast(
        `Taille ${sizeObj.size} indisponible`,
        'error'
      );

      return;
    }

    this.selectedSize = sizeObj;
    this.quantity = 1;
  }

  /* =========================
     QUANTITY
  ========================= */

  increase(): void {

    if (!this.selectedSize) {

      this.showToast(
        'Choisis une taille d’abord ⚠️',
        'error'
      );

      return;
    }

    if (this.quantity < this.selectedSize.stock) {

      this.quantity++;

    } else {

      this.showToast(
        `Maximum disponible pour la taille ${this.selectedSize.size} : ${this.selectedSize.stock}`,
        'error'
      );

    }
  }

  decrease(): void {

    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  /* =========================
     STOCK
  ========================= */

  getTotalStock(product: any): number {

    if (!product?.variants) {
      return 0;
    }

    return product.variants.reduce(
      (total: number, variant: any) => {

        if (!variant?.sizes) {
          return total;
        }

        return total +
          variant.sizes.reduce(
            (stockTotal: number, size: any) =>
              stockTotal + (Number(size.stock) || 0),
            0
          );

      },
      0
    );
  }

  getSelectedVariantStock(): number {

    if (!this.selectedVariant?.sizes) {
      return 0;
    }

    return this.selectedVariant.sizes.reduce(
      (total: number, size: any) =>
        total + (Number(size.stock) || 0),
      0
    );
  }

  /* =========================
     CART
  ========================= */

  addToCart(): void {

    if (!this.product) {
      return;
    }

    /*
     * Vérifier taille
     */
    if (!this.selectedSize) {

      this.showToast(
        'Please select a size ⚠️',
        'error'
      );

      return;
    }

    /*
     * Vérifier stock
     */
    if (this.selectedSize.stock <= 0) {

      this.showToast(
        'Cette taille est en rupture de stock',
        'error'
      );

      return;
    }

    const productWithSize = {

      ...this.product,

      color: this.selectedVariant?.colorName || '',

      colorValue:
        this.selectedVariant?.colorValue || '',

      size: this.selectedSize.size,

      stock: this.selectedSize.stock,

      image:
        this.selectedVariant?.images?.[0] || ''

    };

    const result =
      this.cartService.addToCart(
        productWithSize,
        this.quantity
      );

    if (!result.success) {

      this.showToast(
        result.message || 'Erreur panier',
        'error'
      );

      return;
    }

    this.showToast(
      `${this.product.name} (${this.selectedSize.size}) a été ajouté au panier ✅`,
      'success'
    );
  }

  updateItemQuantity(
    id: number,
    size: string,
    quantity: number
  ): void {

    const result =
      this.cartService.updateQuantity(
        id,
        size,
        quantity
      );

    if (!result.success) {

      this.showToast(
        result.message || 'Erreur',
        'error'
      );

    } else {

      this.showToast(
        result.message || 'Quantité modifiée',
        'success'
      );

    }
  }

  /* =========================
     FAVORITES
  ========================= */

  toggleWishlist(): void {

    if (!this.product) {
      return;
    }

    this.favService.toggle(this.product);

    this.wishlist =
      this.favService.isFavorite(
        this.product.id
      );
  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');
  }

  /* =========================
     ALL SIZES
  ========================= */

  get allSizes(): any[] {

    return this.product?.variants?.flatMap(
      (variant: any) =>
        variant.sizes || []
    ) || [];
  }

  /* =========================
     TOAST
  ========================= */

  showToast(
    message: string,
    type: 'success' | 'error' = 'success'
  ): void {

    this.snackBar.open(
      message,
      '✕',
      {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: type
      }
    );
  }

  /* =========================
     ACCORDION
  ========================= */

  toggleSection(section: string): void {

    this.openSection =
      this.openSection === section
        ? null
        : section;
  }

  /* =========================
     REVIEWS
  ========================= */

  getAverageRating(): number {

    if (!this.reviews.length) {
      return 0;
    }

    const sum =
      this.reviews.reduce(
        (acc: number, review: any) =>
          acc + review.stars,
        0
      );

    return +(sum / this.reviews.length).toFixed(1);
  }

  setRating(stars: number): void {

    this.newReview.stars = stars;
  }

  setEditRating(stars: number): void {

    this.editReview.stars = stars;
  }

  addReview(): void {

    if (
      this.newReview.stars === 0 ||
      !this.newReview.comment.trim()
    ) {

      this.showToast(
        'Choisis une note et écris un commentaire',
        'error'
      );

      return;
    }

    this.reviews.push({

      id: Date.now(),

      stars: this.newReview.stars,

      comment:
        this.newReview.comment.trim()

    });

    this.newReview = {
      stars: 0,
      comment: ''
    };

    this.showToast(
      'Avis ajouté ✅',
      'success'
    );
  }

  startEdit(review: any): void {

    this.editingId = review.id;

    this.editReview = {

      stars: review.stars,

      comment: review.comment

    };
  }

  updateReview(id: number): void {

    if (
      this.editReview.stars === 0 ||
      !this.editReview.comment.trim()
    ) {

      this.showToast(
        'La note et le commentaire sont obligatoires',
        'error'
      );

      return;
    }

    const index =
      this.reviews.findIndex(
        (review: any) =>
          review.id === id
      );

    if (index !== -1) {

      this.reviews[index] = {

        id,

        stars:
          this.editReview.stars,

        comment:
          this.editReview.comment.trim()

      };
    }

    this.cancelEdit();

    this.showToast(
      'Avis modifié ✅',
      'success'
    );
  }

  askDelete(id: number): void {

    this.confirmDeleteId = id;
  }

  confirmDelete(id: number): void {

    this.reviews =
      this.reviews.filter(
        (review: any) =>
          review.id !== id
      );

    this.confirmDeleteId = null;

    this.showToast(
      'Avis supprimé',
      'success'
    );
  }

  cancelDelete(): void {

    this.confirmDeleteId = null;
  }

  cancelEdit(): void {

    this.editingId = null;

    this.editReview = {
      stars: 0,
      comment: ''
    };
  }

}