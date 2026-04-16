import { useCallback, useState } from 'react';
import { Filters } from '../components/products/Filters';
import { ProductGrid } from '../components/products/ProductGrid';
import { useDebounce } from '../hooks/useDebounce';
import { useProducts } from '../hooks/useProducts';
import type { FilterState } from '../types';

const initialFilters: FilterState = {
  search: undefined,
  category: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  page: 1,
  limit: 12,
};

export const Home = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const debouncedFilters = useDebounce(filters, 500);
  const { data, isLoading, error } = useProducts(debouncedFilters);

  const handleFilterChange = useCallback((nextFilters: FilterState) => {
    setFilters((prev) => {
      const merged: FilterState = {
        ...prev,
        ...nextFilters,
        page: 1,
        limit: 12,
      };

      const isUnchanged =
        prev.search === merged.search &&
        prev.category === merged.category &&
        prev.minPrice === merged.minPrice &&
        prev.maxPrice === merged.maxPrice &&
        prev.page === merged.page &&
        prev.limit === merged.limit;

      return isUnchanged ? prev : merged;
    });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900">Discover Amazing Products</h1>
        <p className="mt-2 text-sm text-slate-600">Explore curated products across categories with smart filters.</p>
      </section>

      <section className="mt-6">
        <Filters onFilterChange={handleFilterChange} />
      </section>

      <section className="mt-6 space-y-4">
        <p className="text-sm text-slate-600">Showing {data?.total ?? 0} product(s)</p>
        <ProductGrid products={data?.products ?? []} isLoading={isLoading} error={error ?? null} />
      </section>
    </div>
  );
};
