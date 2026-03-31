import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = [

    {
      id: 1,
      name: "Urban Edge",
      price: 299,
      category: "women",
      oldPrice: 399,
      badge: "sale",
      image: "assets/images/urban-edge.avif",
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock:0}
      ]
    },

    {
      id: 2,
      name: "Neo Classic",
      price: 399,
      category: "Men",
      badge: "bestseller",
      image: "assets/images/neo-classic.avif",
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 0 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock:10}
      ]
    },

    {
      id: 3,
      name: "Minimal Chic",
      price: 89,
      category: "Men",
      badge: "new",
      image: "assets/images/minimal-chic.avif",
      sizes: [
        { size: 'S', stock: 0 },
        { size: 'M', stock: 0 },
        { size: 'L', stock: 0 },
        { size: 'XL', stock:0}
      ]
    },

    {
      id: 4,
      name: "Street Rebel",
      price: 199,
      category: "kids",
      badge: "trending",
      image: "assets/images/street-rebel.avif",
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 0 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock:0}
      ]
    },
    {
      id: 5,
      name: "Urban Edge",
      price: 299,
      category: "women",
      oldPrice: 399,
      badge: "sale",
      image: "assets/images/urban-edge.avif",
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock:0}
      ]
    },

    {
      id: 6,
      name: "Neo Classic",
      price: 399,
      category: "Men",
      badge: "bestseller",
      image: "assets/images/neo-classic.avif",
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock:0}
      ]
    },

    {
      id: 7,
      name: "Minimal Chic",
      price: 89,
      category: "kids",
      badge: "new",
      description: "Comfortable sneakers for everyday use.",
      image: [
        "assets/images/minimal-chic.avif",
        "assets/images/street-rebel.avif",
        "assets/images/minimal-chic.avif",
        "assets/images/minimal-chic.avif"
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock:0}
      ]
    },

    {
      id: 8,
      name: "Street Rebel",
      price: 199,
      badge: "trending",
      image: "assets/images/street-rebel.avif",
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock:0}
      ]
    },

    {
      id: 9,
      name: "Urban Edge",
      price: 299,
      oldPrice: 399,
      category: "women",
      badge: "sale",
      image: "assets/images/urban-edge.avif",
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock:0}
      ]
    },

    {
      id: 10,
      name: "Neo Classic",
      price: 399,
      badge: "bestseller",
      image: "assets/images/neo-classic.avif",
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock:0}
      ]
    },

    {
      id: 11,
      name: "Minimal Chic",
      price: 89,
      badge: "new",
      image: "assets/images/minimal-chic.avif",
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock:0}
      ]
    },

    {
      id: 12,
      name: "Street Rebel",
      price: 199,
      badge: "trending",
      image: "assets/images/street-rebel.avif",
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock:0}
      ]
    },
    {
      id: 13,
      name: "Urban Edge",
      price: 299,
      oldPrice: 399,
      badge: "sale",
      image: "assets/images/urban-edge.avif",
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock:0}
      ]
    },

    {
      id: 14,
      name: "Neo Classic",
      price: 399,
      badge: "bestseller",
      image: "assets/images/neo-classic.avif",
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock:0}
      ]
    },

    {
      id: 15,
      name: "Minimal Chic",
      price: 89,
      badge: "new",
      image: "assets/images/minimal-chic.avif",
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock:0}
      ]
    },

    {
      id: 16,
      name: "Street Rebel",
      price: 199,
      badge: "trending",
      image: "assets/images/street-rebel.avif",
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock:0}
      ]
    }

  ];
  getProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find(p => p.id === id);
  }

  getRelatedProducts(category: string, id: number) {

    return this.products.filter(
      p => p.category === category && p.id !== id
    );

  }

}
