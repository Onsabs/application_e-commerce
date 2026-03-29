import { Component } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private favService: FavoritesService
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

  selectedSize: string = '';

  selectSize(size: string) {
    this.selectedSize = size;
  }

  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product, this.quantity);
  }

  toggleWishlist() {
    this.favService.toggle(this.product);
    this.wishlist = this.favService.isFavorite(this.product.id);
  }

  addToCartWithAnimation() {
    //if (this.stock==0){}
    if (!this.selectedSize) {
      alert('Please select a size');
      return;
    }

    const productWithSize = {
      ...this.product,
      size: this.selectedSize
    };

    this.cartService.addToCart(this.product, this.quantity);

    const img = document.getElementById('productImage') as HTMLElement;
    const cart = document.getElementById('cartIcon') as HTMLElement;

    if (!img || !cart) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const clone = img.cloneNode(true) as HTMLElement;

    clone.style.position = 'fixed';
    clone.style.left = imgRect.left + 'px';
    clone.style.top = imgRect.top + 'px';
    clone.style.width = imgRect.width + 'px';
    clone.style.height = imgRect.height + 'px';
    clone.style.zIndex = '9999';
    clone.style.transition = 'all 0.8s ease-in-out';

    document.body.appendChild(clone);

    setTimeout(() => {
      clone.style.left = cartRect.left + 'px';
      clone.style.top = cartRect.top + 'px';
      clone.style.width = '30px';
      clone.style.height = '30px';
      clone.style.opacity = '0.5';
    }, 50);

    setTimeout(() => {
      clone.remove();
    }, 800);
  }

  wishlistAnimation(event: any) {

    const isChecked = event.target.checked;

    this.wishlist = isChecked;

    this.favService.toggle(this.product);

    if (!isChecked) return;

    const img = document.getElementById('productImage') as HTMLElement;
    const heart = document.getElementById('wishlistIcon') as HTMLElement;

    if (!img || !heart) return;

    const imgRect = img.getBoundingClientRect();
    const heartRect = heart.getBoundingClientRect();

    const clone = img.cloneNode(true) as HTMLElement;

    clone.style.position = 'fixed';
    clone.style.left = imgRect.left + 'px';
    clone.style.top = imgRect.top + 'px';
    clone.style.width = imgRect.width + 'px';
    clone.style.height = imgRect.height + 'px';
    clone.style.zIndex = '9999';
    clone.style.transition = 'all 0.8s ease-in-out';

    document.body.appendChild(clone);

    setTimeout(() => {
      clone.style.left = heartRect.left + 'px';
      clone.style.top = heartRect.top + 'px';
      clone.style.width = '25px';
      clone.style.height = '25px';
      clone.style.opacity = '0.5';
    }, 50);

    setTimeout(() => {
      clone.remove();
    }, 800);
  }


}