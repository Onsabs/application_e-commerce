import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products = [

    {
      id: 1,
      name: "Urban Edge",
      price: 299,
      category: "Women",
      oldPrice: 399,
      badge: "sale",
      stock: 10,
      image: "assets/images/urban-edge.avif"
    },

    {
      id: 2,
      name: "Neo Classic",
      price: 399,
      category: "Men",
      badge: "bestseller",
      stock: 5,
      image: "assets/images/neo-classic.avif"
    },

    {
      id: 3,
      name: "Minimal Chic",
      price: 89,
      category: "Men",
      badge: "new",
      stock: 3,
      image: "assets/images/minimal-chic.avif"
    },

    {
      id: 4,
      name: "Street Rebel",
      price: 199,
      category: "kids",
      badge: "trending",
      stock: 0,
      image: "assets/images/street-rebel.avif"
    },
    {
      id: 5,
      name: "Urban Edge",
      price: 299,
      category: "women",
      oldPrice: 399,
      badge: "sale",
      stock: 10,
      image: "assets/images/urban-edge.avif"
    },

    {
      id: 6,
      name: "Neo Classic",
      price: 399,
      category: "Men",
      badge: "bestseller",
      stock: 5,
      image: "assets/images/neo-classic.avif"
    },

    {
      id: 7,
      name: "Minimal Chic",
      price: 89,
      category: "kids",
      badge: "new",
      stock: 3,
      image: "assets/images/minimal-chic.avif"
    },

    {
      id: 8,
      name: "Street Rebel",
      price: 199,
      badge: "trending",
      stock: 0,
      image: "assets/images/street-rebel.avif"
    },

    {
      id: 9,
      name: "Urban Edge",
      price: 299,
      oldPrice: 399,
      badge: "sale",
      stock: 10,
      image: "assets/images/urban-edge.avif"
    },

    {
      id: 10,
      name: "Neo Classic",
      price: 399,
      badge: "bestseller",
      stock: 5,
      image: "assets/images/neo-classic.avif"
    },

    {
      id: 11,
      name: "Minimal Chic",
      price: 89,
      badge: "new",
      stock: 3,
      image: "assets/images/minimal-chic.avif"
    },

    {
      id: 12,
      name: "Street Rebel",
      price: 199,
      badge: "trending",
      stock: 0,
      image: "assets/images/street-rebel.avif"
    },
    {
      id: 13,
      name: "Urban Edge",
      price: 299,
      oldPrice: 399,
      badge: "sale",
      stock: 10,
      image: "assets/images/urban-edge.avif"
    },

    {
      id: 14,
      name: "Neo Classic",
      price: 399,
      badge: "bestseller",
      stock: 5,
      image: "assets/images/neo-classic.avif"
    },

    {
      id: 15,
      name: "Minimal Chic",
      price: 89,
      badge: "new",
      stock: 3,
      image: "assets/images/minimal-chic.avif"
    },

    {
      id: 16,
      name: "Street Rebel",
      price: 199,
      badge: "trending",
      stock: 0,
      image: "assets/images/street-rebel.avif"
    }

  ];

  selectedCategory = 'all';
  searchTerm = '';
  sortOption = '';
  minPrice = 0;
  maxPrice = 1000;
  priceFilter = { min: this.minPrice, max: this.maxPrice };
  dropdownOpen = false;

  resetSlider() {
  this.priceFilter.min = this.minPrice;
  this.priceFilter.max = this.maxPrice;
}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  updateSlider() {
    if (this.priceFilter.min > this.priceFilter.max) {
      [this.priceFilter.min, this.priceFilter.max] = [this.priceFilter.max, this.priceFilter.min];
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
