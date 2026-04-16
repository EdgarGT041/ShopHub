export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  rating: number;
  numReviews: number;
}

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface FilterState {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ProductListResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface CreateOrderPayload {
  items: Array<{
    product: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}

export interface OrderResponse {
  _id: string;
  total: number;
  status: string;
  createdAt: string;
}
