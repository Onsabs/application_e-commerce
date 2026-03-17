import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  product:any;
  selectedImage:any;
  quantity = 1;
  wishlist=false;
  relatedProducts:any[] = [];

  constructor(
    private route:ActivatedRoute,
    private productService:ProductService
  ){}

  ngOnInit(){
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
  }
  getImage(p: any) {
  return Array.isArray(p.image) ? p.image[0] : p.image;
}
  selectImage(img:string){
    this.selectedImage = img;
  }

  increase(){
    this.quantity++;
  }

  decrease(){
    if(this.quantity>1){
      this.quantity--;
    }
  }

  toggleWishlist(){
    this.wishlist = !this.wishlist;
  }
}