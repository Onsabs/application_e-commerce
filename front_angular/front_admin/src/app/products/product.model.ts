export interface Variant {
  colorName: string;
  colorValue: string;
  images: string[];
  sizes: SizeStock[];
}

export interface SizeStock {
  size: string;
  stock: number;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  category: string;
  description?: string;

  variants: Variant[]; // size + color + stock + images
}