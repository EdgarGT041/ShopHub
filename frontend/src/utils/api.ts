import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import type {
  AuthResponse,
  CreateOrderPayload,
  LoginPayload,
  OrderResponse,
  Product,
  ProductListResponse,
  ProductQueryParams,
  RegisterPayload,
} from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

const getTokenFromStorage = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const persisted = window.localStorage.getItem('shophub-auth');

    if (!persisted) {
      return null;
    }

    const parsed = JSON.parse(persisted) as { state?: { token?: string | null } };
    return parsed.state?.token ?? null;
  } catch {
    return null;
  }
};

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getTokenFromStorage();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

export const getProducts = async (
  params: ProductQueryParams = {}
): Promise<ProductListResponse> => {
  const response = await apiClient.get<ProductListResponse>('/products', { params });
  return response.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
};

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', payload);
  return response.data;
};

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', payload);
  return response.data;
};

export const createOrder = async (payload: CreateOrderPayload): Promise<OrderResponse> => {
  const response = await apiClient.post<OrderResponse>('/orders', payload);
  return response.data;
};
