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
      stock: 10,
      image: "assets/images/urban-edge.avif",
      sizes: ['S', 'M', 'L', 'XL']
    },

    {
      id: 2,
      name: "Neo Classic",
      price: 399,
      category: "Men",
      badge: "bestseller",
      stock: 5,
      image: "assets/images/neo-classic.avif",
      sizes: ['S', 'M', 'L', 'XLL']
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
      description:"Comfortable sneakers for everyday use.",
      image: [
        "assets/images/minimal-chic.avif",
              "assets/images/street-rebel.avif",
              "assets/images/minimal-chic.avif",
              "assets/images/minimal-chic.avif"
            ]
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
      category: "women",
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
   getProducts(){
    return this.products;
  }

  getProductById(id:number){
    return this.products.find(p => p.id === id);
  }

  getRelatedProducts(category:string, id:number){

  return this.products.filter(
    p => p.category === category && p.id !== id
  );

}

}
