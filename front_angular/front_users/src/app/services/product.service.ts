import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = [

    {
      id: 1,
      name: "T-shirt",
      price: 299,
      category: "women",
      oldPrice: 399,
      badge: "sale",
      description: "High quality streetwear with modern design.",
      image: [
        "assets/images/t-shirt 2.jpg",
        "assets/images/t-shirt 2 (2).jpg",
        "assets/images/t-shirt 2 (3).jpg",
        "assets/images/t-shirt 2 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 2,
      name: "T-shirt",
      price: 399,
      category: "Men",
      badge: "bestseller",
      image: [
        "assets/images/t-shirt 3.jpg",
        "assets/images/t-shirt 3 (2).jpg",
        "assets/images/t-shirt 3 (3).jpg",
        "assets/images/t-shirt 3 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 0 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 10 }
      ]
    },

    {
      id: 3,
      name: "T-shirt",
      price: 89,
      category: "Men",
      badge: "new",
      image: [
        "assets/images/t-shirt 4.jpg",
        "assets/images/t-shirt 4 (2).jpg",
        "assets/images/t-shirt 4 (3).jpg",
        "assets/images/t-shirt 4 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 0 },
        { size: 'M', stock: 0 },
        { size: 'L', stock: 0 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 4,
      name: "T-shirt",
      price: 199,
      category: "Men",
      badge: "trending",
      image: [
        "assets/images/t-shirt 1.jpg",
        "assets/images/t-shirt 1 (2).jpg",
        "assets/images/t-shirt 1 (3).jpg",
        "assets/images/t-shirt 1 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 0 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },
    {
      id: 5,
      name: "Veste",
      price: 299,
      category: "men",
      oldPrice: 399,
      badge: "sale",
      image: [
        "assets/images/veste 1.jpg",
        "assets/images/veste 1 (2).jpg",
        "assets/images/veste 1 (3).jpg",
        "assets/images/veste 1 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 6,
      name: "Sweat",
      price: 399,
      category: "women",
      badge: "bestseller",
      image: [
        "assets/images/sweat 1.jpg",
        "assets/images/sweat 1 (2).jpg",
        "assets/images/sweat 1 (3).jpg",
        "assets/images/sweat 1 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 7,
      name: "sweat",
      price: 89,
      category: "women",
      badge: "new",
      description: "Comfortable for everyday use.",
      image: [
        "assets/images/sweat 2.jpg",
        "assets/images/sweat 2 (2).jpg",
        "assets/images/sweat 2 (3).jpg",
        "assets/images/sweat 2 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: "Robe",
      price: 199,
      category: "women",
      badge: "trending",
      image: [
        "assets/images/robe 1.jpg",
        "assets/images/robe 1 (2).jpg",
        "assets/images/robe 1 (3).jpg",
        "assets/images/robe 1 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 9,
      name: "Robe",
      price: 299,
      oldPrice: 399,
      category: "women",
      badge: "sale",
      image: [
        "assets/images/robe 2.jpg",
        "assets/images/robe 2 (2).jpg",
        "assets/images/robe 2 (3).jpg",
        "assets/images/robe 2 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: "Robe",
      price: 399,
      category: "women",
      badge: "bestseller",
      image: [
        "assets/images/robe 3.jpg",
        "assets/images/robe 3 (2).jpg",
        "assets/images/robe 3 (5).jpg",
        "assets/images/robe 3 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 11,
      name: "Robe",
      price: 89,
      category: "women",
      badge: "new",
      image: [
        "assets/images/robe 4.jpg",
        "assets/images/robe 4 (2).jpg",
        "assets/images/robe 4 (3).jpg",
        "assets/images/robe 4 (5).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 12,
      name: "Pantalon",
      price: 199,
      category: "women",
      badge: "trending",
      image: [
        "assets/images/pantalon 1.jpg",
        "assets/images/pantalon 1 (2).jpg",
        "assets/images/pantalon 1 (3).jpg",
        "assets/images/pantalon 1 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },
    {
      id: 13,
      name: "Pantalon",
      price: 299,
      category: "women",
      oldPrice: 399,
      badge: "sale",
      image: [
        "assets/images/pantalon 3.jpg",
        "assets/images/sweat 2 (4).jpg",
        "assets/images/pantalon 3 (2).jpg",
        "assets/images/pantalon 3 (3).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 14,
      name: "Pantalon",
      price: 399,
      category: "women",
      badge: "bestseller",
      image: [
        "assets/images/pantalon 2.jpg",
        "assets/images/pantalon 2 (2).jpg",
        "assets/images/pantalon 2 (3).jpg",
        "assets/images/pantalon 2 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 15,
      name: "Jeans",
      price: 89,
      category: "men",
      badge: "new",
      image: [
        "assets/images/jeans 4.jpg",
        "assets/images/jeans 4 (2).jpg",
        "assets/images/jeans 4 (5).jpg",
        "assets/images/jeans 4 (6).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 16,
      name: "Jeans",
      price: 199,
      category: "women",
      badge: "trending",
      image: [
        "assets/images/jeans 3.jpg",
        "assets/images/jeans 3 (2).jpg",
        "assets/images/jeans 3 (3).jpg",
        "assets/images/jeans 3 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 17,
      name: "Jeans",
      price: 199,
      category: "women",
      badge: "trending",
      image: [
        "assets/images/jeans 2.jpg",
        "assets/images/jeans 2 (2).jpg",
        "assets/images/jeans 2 (3).jpg",
        "assets/images/jeans 2 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 18,
      name: "Jeans",
      price: 199,
      category: "women",
      badge: "trending",
      image: [
        "assets/images/jeans 1.jpg",
        "assets/images/jeans 1 (2).jpg",
        "assets/images/jeans 1 (5).jpg",
        "assets/images/jeans 1 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 19,
      name: "Costume",
      price: 199,
      category: "Men",
      badge: "trending",
      image: [
        "assets/images/costume 1.webp",
        "assets/images/costume 1 (2).webp",
        "assets/images/costume 1 (3).webp",
        "assets/images/costume 1 (4).webp",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 20,
      name: "Costume",
      price: 199,
      category: "Men",
      badge: "trending",
      image: [
        "assets/images/costume 2.webp",
        "assets/images/costume 2 (2).webp",
        "assets/images/costume 2 (3).webp",
        "assets/images/costume 2 (4).webp",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 21,
      name: "T-shirt",
      price: 89,
      category: "kids",
      badge: "new",
      image: [
        "assets/images/t-shirt 5.jpg",
        "assets/images/t-shirt 5 (2).jpg",
        "assets/images/t-shirt 5 (3).jpg",
        "assets/images/t-shirt 5 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 22,
      name: "Short",
      price: 199,
      category: "kids",
      badge: "trending",
      image: [
        "assets/images/short 1.jpg",
        "assets/images/short 1 (2).jpg",
        "assets/images/short 1 (3).jpg",
        "assets/images/short 1 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 23,
      name: "Top",
      price: 199,
      category: "kids",
      badge: "trending",
      image: [
        "assets/images/top 1.jpg",
        "assets/images/top 1 (2).jpg",
        "assets/images/top 1 (3).jpg",
        "assets/images/top 1 (4).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 24,
      name: "Pyjama",
      price: 199,
      category: "kids",
      badge: "trending",
      image: [
        "assets/images/pyjama 1.jpg",
        "assets/images/pyjama 1 (2).jpg",
        "assets/images/pyjama 1 (5).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

    {
      id: 25,
      name: "Sweat",
      price: 199,
      category: "kids",
      badge: "trending",
      image: [
        "assets/images/sweat 3.jpg",
        "assets/images/sweat 3 (2).jpg",
        "assets/images/sweat 3 (3).jpg",
      ],
      sizes: [
        { size: 'S', stock: 3 },
        { size: 'M', stock: 5 },
        { size: 'L', stock: 2 },
        { size: 'XL', stock: 0 }
      ]
    },

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
