
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  weight?: string;
  stock?: number;
  discountPercentage?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}
