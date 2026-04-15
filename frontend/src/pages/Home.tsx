import { useMemo, useState } from 'react';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Filters, type ProductFilterValues } from '../components/products/Filters';
import { ProductGrid } from '../components/products/ProductGrid';
import { useDebounce } from '../hooks/useDebounce';
import { useProducts } from '../hooks/useProducts';
import type { ProductQueryParams } from '../types';

const initialFilters: ProductFilterValues = {
  search: '',
  category: '',
  minPrice: '',
  maxPrice: '',
};

export const Home = () => {
  const [filters, setFilters] = useState<ProductFilterValues>(initialFilters);
  const debouncedSearch = useDebounce(filters.search, 500);

  const queryFilters = useMemo<ProductQueryParams>(() => {
    return {
      category: filters.category || undefined,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
      search: debouncedSearch || undefined,
      page: 1,
      limit: 12,
    };
  }, [filters.category, filters.maxPrice, filters.minPrice, debouncedSearch]);

  const { data, isLoading, error, refetch } = useProducts(queryFilters);

  const onFilterChange = (field: keyof ProductFilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold text-slate-900">Discover Products</h1>
        <p className="mt-1 text-sm text-slate-600">Browse the latest items from our multi-category marketplace.</p>
      </section>

      <Filters values={filters} onChange={onFilterChange} onClear={() => setFilters(initialFilters)} />

      {isLoading ? <LoadingSpinner size="lg" /> : null}

      {error ? <ErrorMessage message={error.message} retry={() => void refetch()} /> : null}

      {!isLoading && !error ? (
        <section className="space-y-4">
          <p className="text-sm text-slate-600">Showing {data?.total ?? 0} product(s)</p>
          <ProductGrid products={data?.products ?? []} />
        </section>
      ) : null}
    </div>
  );
};
