export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  supplements?: string[];
}