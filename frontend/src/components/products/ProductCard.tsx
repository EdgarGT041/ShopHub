import { ShoppingCart, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import type { Product } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const image = product.images[0] ?? 'https://placehold.co/400x400/png?text=Product';
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      return;
    }

    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <article className="group overflow-hidden rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-xl">
      <Link to={`/product/${product._id}`} className="relative block overflow-hidden rounded-md">
        <img
          src={image}
          alt={product.name}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isOutOfStock ? (
          <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
            Out of Stock
          </span>
        ) : null}
      </Link>
      <div className="space-y-3 p-4">
        <p className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{product.category}</p>
        <Link to={`/product/${product._id}`} className="line-clamp-2 block text-lg font-semibold text-slate-900 transition hover:text-blue-700">
          {product.name}
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-slate-900">{formatCurrency(product.price)}</span>
          <span className="flex items-center gap-1 text-sm text-amber-600">
            <Star className="h-4 w-4 fill-current" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          aria-label={`Add ${product.name} to cart`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <ShoppingCart className="h-4 w-4" />
          {isOutOfStock ? 'Out of stock' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
};
