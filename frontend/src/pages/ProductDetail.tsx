import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useCartStore } from '../store/cartStore';
import type { Product } from '../types';
import { getProduct } from '../utils/api';
import { formatCurrency, formatStockStatus } from '../utils/formatters';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const addItem = useCartStore((state) => state.addItem);

  const { data: product, isLoading, error, refetch } = useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Product id is required.');
      }

      return getProduct(id);
    },
    enabled: Boolean(id),
  });

  if (!id) {
    return <ErrorMessage message="Product id is missing from route." />;
  }

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} retry={() => void refetch()} />;
  }

  if (!product) {
    return <ErrorMessage message="Product not found." />;
  }

  const image = product.images[0] ?? 'https://placehold.co/400x400/png?text=Product';
  const outOfStock = product.stock <= 0;

  return (
    <div className="space-y-5">
      <Link to="/" className="text-sm font-medium text-blue-700 hover:underline">
        ← Back to products
      </Link>
      <div className="grid gap-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2">
        <img src={image} alt={product.name} className="h-80 w-full rounded-lg object-cover" />
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{product.category}</span>
          <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
          <p className="text-slate-600">{product.description}</p>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-amber-600">
              <Star className="h-4 w-4 fill-current" />
              {product.rating.toFixed(1)}
            </span>
            <span className="text-slate-500">({product.numReviews} reviews)</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(product.price)}</p>
          <p className={`text-sm ${outOfStock ? 'text-red-600' : 'text-emerald-600'}`}>{formatStockStatus(product.stock)}</p>
          <button
            type="button"
            onClick={() => addItem(product)}
            disabled={outOfStock}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {outOfStock ? 'Out of stock' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
};
