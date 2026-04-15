import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../utils/api';
import type { ProductListResponse, ProductQueryParams } from '../types';

export const useProducts = (filters: ProductQueryParams) => {
  return useQuery<ProductListResponse, Error>({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  });
};
