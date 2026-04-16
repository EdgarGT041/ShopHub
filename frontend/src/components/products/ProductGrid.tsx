import type { Product } from '../../types';
import { ErrorMessage } from '../common/ErrorMessage';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

export const ProductGrid = ({ products, isLoading, error }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="overflow-hidden rounded-lg bg-white p-4 shadow-md">
            <div className="h-64 rounded-md bg-gray-200 animate-pulse" />
            <div className="mt-4 h-5 w-3/4 rounded bg-gray-200 animate-pulse" />
            <div className="mt-3 h-4 w-1/2 rounded bg-gray-200 animate-pulse" />
            <div className="mt-5 h-10 w-full rounded bg-gray-200 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error.message || 'Something went wrong loading products.'} />;
  }

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
        No products found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
