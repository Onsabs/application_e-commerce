import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products:any[] = [];

  constructor(private productService:ProductService){}

  ngOnInit(){
    this.products = this.productService.getProducts();
  }

  selectedCategory = 'all';
  searchTerm = '';
  sortOption = '';
  minPrice = 0;
  maxPrice = 1000;
  priceFilter = { min: this.minPrice, max: this.maxPrice };
  dropdownOpen = false;


getProductImage(product: any): string {
  if (Array.isArray(product.image)) {
    return product.image[0]; 
  }
  return product.image; 
}
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  resetSlider() {
    this.priceFilter.min = this.minPrice;
    this.priceFilter.max = this.maxPrice;
  }
  updateSlider() {

    if (this.priceFilter.min > this.priceFilter.max) {

      const temp = this.priceFilter.min;
      this.priceFilter.min = this.priceFilter.max;
      this.priceFilter.max = temp;

    }

  }
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.currentPage = 1;
  }

  get filteredProducts() {
    let prods = [...this.products];

    // Category
    if (this.selectedCategory !== 'all') {
      prods = prods.filter(p => p.category && p.category.toLowerCase() === this.selectedCategory);
    }

    // Search
    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      prods = prods.filter(p =>
        p.name.toLowerCase().includes(term) ||
        (p.category && p.category.toLowerCase().includes(term))
      );
    }


    // Price filter
    prods = prods.filter(p => p.price >= this.priceFilter.min && p.price <= this.priceFilter.max);

    // Sort
    if (this.sortOption === 'priceAsc') prods.sort((a, b) => a.price - b.price);
    if (this.sortOption === 'priceDesc') prods.sort((a, b) => b.price - a.price);
    if (this.sortOption === 'az') prods.sort((a, b) => a.name.localeCompare(b.name));
    if (this.sortOption === 'za') prods.sort((a, b) => b.name.localeCompare(a.name));

    return prods;
  }

  currentPage = 1;
  itemsPerPage = 4;

  get totalPages() {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProducts.slice(start, end);
  }

  // dynamic pagination with dots
  get pages() {
    const pages: (number | string)[] = [];
    const total = this.totalPages;

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      // always show first and last
      pages.push(1);

      let start = Math.max(this.currentPage - 2, 2);
      let end = Math.min(this.currentPage + 2, total - 1);

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < total - 1) pages.push('...');

      pages.push(total);
    }

    return pages;
  }

  goToPage(page: number | string) {
    if (typeof page === 'number') this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

}
