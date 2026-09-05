export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}