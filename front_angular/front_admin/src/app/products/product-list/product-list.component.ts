import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  sortDirection: { [key: string]: boolean } = {};

  searchTerm: string = '';
  selectedProductId: number | null = null;
  selectedCategory: string = '';
  filterOpen = false;

  currentPage: number = 1;
  itemsPerPage: number = 5;

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private productService: ProductService, private router: Router) { };

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  getCategoryLabel(category: string): string {

    switch (category) {

      case 'men':
        return 'Homme';

      case 'women':
        return 'Femme';

      case 'kids':
        return 'Enfants';

      default:
        return category;
    }
  }

  goToAddProduct() {
    this.router.navigate(['/product-form']);
  }

  applyFilters() {

    let data = this.products;

    // category
    if (this.selectedCategory) {
      data = data.filter(p => p.category === this.selectedCategory);
    }

    // search
    if (this.searchTerm) {
      data = data.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredProducts = data;
  }

  toggleFilter() {
    this.filterOpen = !this.filterOpen;
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
    this.filterOpen = false;
    this.applyFilters(); // ولا filterByCategory()
  }

  sortData(column: string) {

    this.sortDirection[column] = !this.sortDirection[column];

    const direction = this.sortDirection[column] ? 1 : -1;

    this.filteredProducts.sort((a: any, b: any) => {

      let valueA = a[column];
      let valueB = b[column];

      // PRICE
      if (column === 'price') {
        valueA = Number(valueA);
        valueB = Number(valueB);
      }

      // DATE
      if (column === 'createdAt') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }

      if (valueA < valueB) return -1 * direction;
      if (valueA > valueB) return 1 * direction;
      return 0;
    });
  }

  editProduct(p: any) {
    this.router.navigate(['/product-form', p.id]);
  }

  openDeleteModal(id: number) {
    this.selectedProductId = id;
  }

  closeDeleteModal() {
    this.selectedProductId = null;
  }

  confirmDelete() {
  if (this.selectedProductId == null) return;

  const id = this.selectedProductId;

  this.productService.deleteProduct(id)
    .subscribe(() => {

      this.products = this.products.filter(p => p.id !== id);

      this.currentPage = 1;
      this.applyFilters();

      this.closeDeleteModal();
      this.selectedProductId = null;
    });
}

  getTotalStock(product: any): number {
    return product.variants.reduce((total: number, v: any) => {
      return total + v.sizes.reduce((s: number, size: any) => s + size.stock, 0);
    }, 0);
  }

  //PAGINATION 
  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProducts.slice(start, end);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
}
