import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';
import type { FilterState, ProductListResponse } from '../types';

export const useProducts = (filters: FilterState) => {
  return useQuery<ProductListResponse, Error>({
    queryKey: ['products', filters],
    queryFn: () => api.getProducts(filters),
    staleTime: 5 * 60 * 1000,
  });
};
