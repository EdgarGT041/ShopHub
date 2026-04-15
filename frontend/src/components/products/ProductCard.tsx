import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import type { Product } from '../../types';
import { formatCurrency, formatStockStatus } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const image = product.images[0] ?? 'https://placehold.co/400x400/png?text=Product';
  const isOutOfStock = product.stock <= 0;

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <Link to={`/product/${product._id}`}>
        <img src={image} alt={product.name} className="h-48 w-full object-cover" />
      </Link>
      <div className="space-y-3 p-4">
        <p className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{product.category}</p>
        <Link to={`/product/${product._id}`} className="block text-lg font-semibold text-slate-900 transition hover:text-blue-700">
          {product.name}
        </Link>
        <p className="line-clamp-2 text-sm text-slate-600">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">{formatCurrency(product.price)}</span>
          <span className="flex items-center gap-1 text-sm text-amber-600">
            <Star className="h-4 w-4 fill-current" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <p className={`text-sm ${isOutOfStock ? 'text-red-600' : 'text-emerald-600'}`}>{formatStockStatus(product.stock)}</p>
        <button
          type="button"
          onClick={() => addItem(product)}
          disabled={isOutOfStock}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isOutOfStock ? 'Out of stock' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
};
